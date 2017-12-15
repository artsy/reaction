import * as React from "react"
import { commitMutation, createFragmentContainer, graphql, QueryRenderer, RelayProp } from "react-relay"
import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"

import { ContextConsumer, ContextProps } from "../../../Artsy"
import ItemLink from "../../ItemLink"

export interface RelayProps {
  suggested_genes: [
    {
      id: string | null
      _id: string | null
      name: string | null
      image: {
        cropped: {
          url: string | null
        }
      } | null
    }
  ]
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, RelayProps {
  relay?: RelayProp
}

class SuggestedGenesContent extends React.Component<Props, null> {
  private excludedGeneIds: Set<string>

  constructor(props: RelayProps, context: any) {
    super(props, context)
    this.excludedGeneIds = new Set(this.props.suggested_genes.map(item => item._id))
  }

  followedGene(followedGene: any) {
    this.excludedGeneIds.add(followedGene._id)

    const onGeneFollowed = (store: RecordSourceSelectorProxy, data: SelectorData): void => {
      const suggestedGene = store.get(data.followGene.gene.similar.edges[0].node.__id)
      this.excludedGeneIds.add(suggestedGene.getValue("_id"))

      const suggestedGenesRootField = store.get("client:root")
      const suggestedGenes = suggestedGenesRootField.getLinkedRecords("suggested_genes")
      const updatedSuggestedGenes = suggestedGenes.map(gene => (gene.getValue("id") === followedGene.id ? suggestedGene : gene))

      suggestedGenesRootField.setLinkedRecords(updatedSuggestedGenes, "suggested_genes")
    }

    commitMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation SuggestedGenesFollowGeneMutation($input: FollowGeneInput!, $excludedGeneIds: [String]!) {
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
          gene_id: followedGene.id,
        },
        excludedGeneIds: Array.from(this.excludedGeneIds),
      },
      updater: (store: RecordSourceSelectorProxy, data: SelectorData) => onGeneFollowed(store, data),
    })
  }

  render() {
    const items = this.props.suggested_genes.map((item, index) => {
      return (
        <ItemLink
          href="#"
          item={item}
          key={index}
          id={item.id}
          _id={item._id}
          name={item.name}
          image_url={item.image.cropped.url}
          onClick={() => this.followedGene(item)}
        />
      )
    })

    return <div>{items}</div>
  }
}

const SuggestedGenesContainer = createFragmentContainer(
  SuggestedGenesContent,
  graphql`
    fragment SuggestedGenesContent_suggested_genes on Gene @relay(plural: true) {
      id
      _id
      name
      image {
        cropped(width: 100, height: 100) {
          url
        }
      }
    }
  `
)

const SuggestedGenesComponent: React.SFC<ContextProps> = ({ relayEnvironment }) => {
  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query SuggestedGenesQuery {
          suggested_genes {
            ...SuggestedGenesContent_suggested_genes
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (props) {
          return <SuggestedGenesContainer suggested_genes={props.suggested_genes} />
        } else {
          return null
        }
      }}
    />
  )
}

export const SuggestedGenes = ContextConsumer(SuggestedGenesComponent)
