import { GeneSearchResultsContent_viewer } from "__generated__/GeneSearchResultsContent_viewer.graphql"
import {
  GeneSearchResultsFollowGeneMutation,
  GeneSearchResultsFollowGeneMutationResponse,
} from "__generated__/GeneSearchResultsFollowGeneMutation.graphql"
import { GeneSearchResultsQuery } from "__generated__/GeneSearchResultsQuery.graphql"
import { ContextProps, withContext } from "Artsy/SystemContext"
import { garamond } from "Assets/Fonts"
import * as React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  QueryRenderer,
  RelayProp,
} from "react-relay"
import track, { TrackingProp } from "react-tracking"
import { RecordSourceSelectorProxy } from "relay-runtime"
import styled from "styled-components"
import { get } from "Utils/get"
import Events from "../../../../Utils/Events"
import ReplaceTransition from "../../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../../ItemLink"
import { FollowProps } from "../../Types"

type Gene = GeneSearchResultsContent_viewer["match_gene"][0]

interface ContainerProps extends FollowProps {
  term: string
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, ContainerProps {
  tracking?: TrackingProp
  relay?: RelayProp
  viewer: GeneSearchResultsContent_viewer
}

const NoResultsContainer = styled.div`
  ${garamond("s17")};
  text-align: center;
  font-style: italic;
  border-bottom: none;
  font-weight: lighter;
`

@track({}, { dispatch: data => Events.postEvent(data) })
class GeneSearchResultsContent extends React.Component<Props, null> {
  private excludedGeneIds: Set<string>
  followCount: number = 0

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedGeneIds = new Set(
      this.props.viewer.match_gene.map(item => item._id)
    )
  }

  onGeneFollowed(
    gene: Gene,
    store: RecordSourceSelectorProxy,
    data: GeneSearchResultsFollowGeneMutationResponse
  ): void {
    const suggestedGene = store.get(
      data.followGene.gene.similar.edges[0].node.__id
    )
    this.excludedGeneIds.add(suggestedGene.getValue("_id"))

    const suggestedGenesRootField = store.get("client:root:viewer")
    const suggestedGenes = suggestedGenesRootField.getLinkedRecords(
      "match_gene",
      { term: this.props.term }
    )
    const updatedSuggestedGenes = suggestedGenes.map(
      geneItem =>
        geneItem.getValue("id") === gene.id ? suggestedGene : geneItem
    )

    suggestedGenesRootField.setLinkedRecords(
      updatedSuggestedGenes,
      "match_gene",
      { term: this.props.term }
    )

    this.followCount += 1

    this.props.updateFollowCount(this.followCount)

    this.props.tracking.trackEvent({
      action: "Followed Gene",
      entity_id: gene._id,
      entity_slug: gene.id,
      context_module: "onboarding search",
    })
  }

  followedGene(gene: Gene) {
    this.excludedGeneIds.add(gene._id)

    commitMutation<GeneSearchResultsFollowGeneMutation>(
      this.props.relay.environment,
      {
        mutation: graphql`
          mutation GeneSearchResultsFollowGeneMutation(
            $input: FollowGeneInput!
            $excludedGeneIds: [String]!
          ) {
            followGene(input: $input) {
              gene {
                similar(first: 1, exclude_gene_ids: $excludedGeneIds) {
                  edges {
                    node {
                      id
                      _id
                      __id
                      name
                      image {
                        cropped(width: 100, height: 100) {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            gene_id: gene.id,
          },
          excludedGeneIds: Array.from(this.excludedGeneIds),
        },
        updater: (store, data) => this.onGeneFollowed(gene, store, data),
      }
    )
  }

  render() {
    const items = this.props.viewer.match_gene.map((item, index) => (
      <LinkContainer key={`gene-search-results-${index}`}>
        <ReplaceTransition
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={400}
        >
          <ItemLink
            href="#"
            item={item}
            key={item.id}
            id={item.id}
            name={item.name}
            image_url={get(item, i => i.image.cropped.url)}
            onClick={() => this.followedGene(item)}
          />
        </ReplaceTransition>
      </LinkContainer>
    ))

    if (items.length < 1) {
      return <NoResultsContainer>No Results Found</NoResultsContainer>
    }

    return <div>{items}</div>
  }
}

const GeneSearchResultsContentContainer = createFragmentContainer(
  GeneSearchResultsContent,
  graphql`
    fragment GeneSearchResultsContent_viewer on Viewer {
      match_gene(term: $term) {
        name
        id
        _id
        image {
          cropped(width: 100, height: 100) {
            url
          }
        }
      }
    }
  `
)

const GeneSearchResultsComponent: React.SFC<ContainerProps & ContextProps> = ({
  term,
  relayEnvironment,
  updateFollowCount,
}) => {
  return (
    <QueryRenderer<GeneSearchResultsQuery>
      environment={relayEnvironment}
      query={graphql`
        query GeneSearchResultsQuery($term: String!) {
          viewer {
            ...GeneSearchResultsContent_viewer
          }
        }
      `}
      variables={{ term }}
      render={({ error, props }) => {
        if (props) {
          return (
            <GeneSearchResultsContentContainer
              viewer={props.viewer}
              term={term}
              updateFollowCount={updateFollowCount}
            />
          )
        } else {
          return null
        }
      }}
    />
  )
}

export const GeneSearchResults = withContext(GeneSearchResultsComponent)
