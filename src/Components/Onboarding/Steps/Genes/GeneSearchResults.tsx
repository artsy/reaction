import { garamond } from "Assets/Fonts"
import * as React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  QueryRenderer,
  RelayProp,
} from "react-relay"
import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import styled from "styled-components"
import Events from "../../../../Utils/Events"
import { track } from "../../../../Utils/track"
import ReplaceTransition from "../../../Animation/ReplaceTransition"
import { ContextConsumer, ContextProps } from "../../../Artsy"
import ItemLink, { LinkContainer } from "../../ItemLink"
import { FollowProps } from "../../Types"

interface Gene {
  id: string | null
  _id: string | null
  __id: string | null
  name: string | null
  image: {
    cropped: {
      url: string | null
    }
  } | null
}

interface Props extends FollowProps {
  term: string
}

interface RelayProps extends React.HTMLProps<HTMLAnchorElement>, Props {
  tracking?: any
  relay?: RelayProp
  viewer: {
    match_gene: Gene[]
  }
}

const NoResultsContainer = styled.div`
  ${garamond("s17")};
  text-align: center;
  font-style: italic;
  border-bottom: none;
  font-weight: lighter;
`

@track({}, { dispatch: data => Events.postEvent(data) })
class GeneSearchResultsContent extends React.Component<RelayProps, null> {
  private excludedGeneIds: Set<string>
  followCount: number = 0

  constructor(props: RelayProps, context: any) {
    super(props, context)
    this.excludedGeneIds = new Set(
      this.props.viewer.match_gene.map(item => item._id)
    )
  }

  onGeneFollowed(
    gene: Gene,
    store: RecordSourceSelectorProxy,
    data: SelectorData
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

    commitMutation(this.props.relay.environment, {
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
      updater: (store: RecordSourceSelectorProxy, data: SelectorData) =>
        this.onGeneFollowed(gene, store, data),
    })
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
            image_url={item.image.cropped.url}
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

const GeneSearchResultsComponent: React.SFC<Props & ContextProps> = ({
  term,
  relayEnvironment,
  updateFollowCount,
}) => {
  return (
    <QueryRenderer
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

export const GeneSearchResults = ContextConsumer(GeneSearchResultsComponent)
