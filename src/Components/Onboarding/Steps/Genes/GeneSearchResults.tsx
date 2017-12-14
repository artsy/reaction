import * as React from "react"
import { commitMutation, createFragmentContainer, graphql, QueryRenderer, RelayProp } from "react-relay"
import styled from "styled-components"

import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import * as fonts from "../../../../Assets/Fonts"
import { ContextConsumer, ContextProps } from "../../../Artsy"
import ItemLink from "../../ItemLink"

export interface RelayProps {
  relay?: RelayProp
  term: string
  viewer: {
    match_gene: any[]
  }
}

const NoResultsContainer = styled.div`
  text-align: center;
  font-style: italic;
  font-family: ${fonts.secondary.fontFamily};
  font-size: 17px;
  border-bottom: none;
  font-weight: lighter;
`

class GeneSearchResultsContent extends React.Component<RelayProps, null> {
  onGeneFollowed(geneId: string, store: RecordSourceSelectorProxy, data: SelectorData): void {
    const suggestedGene = store.get(data.followGene.gene.similar.edges[0].node.__id)

    const suggestedGenesRootField = store.get("client:root:viewer")
    const suggestedGenes = suggestedGenesRootField.getLinkedRecords("match_gene", { term: this.props.term })
    const updatedSuggestedGenes = suggestedGenes.map(gene => (gene.getValue("id") === geneId ? suggestedGene : gene))

    suggestedGenesRootField.setLinkedRecords(updatedSuggestedGenes, "match_gene", { term: this.props.term })
  }

  followedGene(geneId: string) {
    commitMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation GeneSearchResultsFollowGeneMutation($input: FollowGeneInput!) {
          followGene(input: $input) {
            gene {
              similar(first: 1) {
                edges {
                  node {
                    id
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
          gene_id: geneId
        },
      },
      updater: (store: RecordSourceSelectorProxy, data: SelectorData) => this.onGeneFollowed(geneId, store, data)
    })
  }

  render() {
    const items = this.props.viewer.match_gene.map((item, index) => {
      return (
        <ItemLink
          href="#"
          item={item}
          key={index}
          id={item.id}
          name={item.name}
          image_url={item.image.cropped.url}
          onClick={() => this.followedGene(item.id)}
        />
      )
    })

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

interface Props {
  term: string
}

const GeneSearchResultsComponent: React.SFC<Props & ContextProps> = ({ term, relayEnvironment }) => {
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
          return <GeneSearchResultsContentContainer viewer={props.viewer} term={term} />
        } else {
          return null
        }
      }}
    />
  )
}

export const GeneSearchResults = ContextConsumer(GeneSearchResultsComponent)
