import * as React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  QueryRenderer,
  RelayProp,
} from "react-relay"
import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"

import ReplaceTransition from "../../../Animation/ReplaceTransition"
import { ContextConsumer, ContextProps } from "../../../Artsy"
import ItemLink, { LinkContainer } from "../../ItemLink"
import { FollowProps } from "../../Types"

interface Gene {
  id: string | null
  _id: string | null
  name: string | null
  image: {
    cropped: {
      url: string | null
    }
  } | null
}

interface RelayProps {
  relay?: RelayProp
  suggested_genes: Gene[]
}

interface Props
  extends React.HTMLProps<HTMLAnchorElement>,
    RelayProps,
    FollowProps {}

class SuggestedGenesContent extends React.Component<Props, null> {
  private excludedGeneIds: Set<string>
  followCount: number = 0

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedGeneIds = new Set(
      this.props.suggested_genes.map(item => item._id)
    )
  }

  onGeneFollowed(
    geneId: string,
    store: RecordSourceSelectorProxy,
    data: SelectorData
  ): void {
    const suggestedGene = store.get(
      data.followGene.gene.similar.edges[0].node.__id
    )
    this.excludedGeneIds.add(suggestedGene.getValue("_id"))

    const suggestedGenesRootField = store.get("client:root")
    const suggestedGenes = suggestedGenesRootField.getLinkedRecords(
      "suggested_genes"
    )
    const updatedSuggestedGenes = suggestedGenes.map(
      gene => (gene.getValue("id") === geneId ? suggestedGene : gene)
    )

    suggestedGenesRootField.setLinkedRecords(
      updatedSuggestedGenes,
      "suggested_genes"
    )

    this.followCount += 1

    this.props.updateFollowCount(this.followCount)
  }

  followedGene(gene: Gene) {
    this.excludedGeneIds.add(gene._id)

    commitMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation SuggestedGenesFollowGeneMutation(
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
        this.onGeneFollowed(gene.id, store, data),
    })
  }

  render() {
    const items = this.props.suggested_genes.map(item => (
      <LinkContainer key={item._id}>
        <ReplaceTransition
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={400}
        >
          <ItemLink
            href="#"
            item={item}
            id={item.id}
            _id={item._id}
            name={item.name}
            image_url={item.image.cropped.url}
            onClick={() => this.followedGene(item)}
          />
        </ReplaceTransition>
      </LinkContainer>
    ))

    return <div>{items}</div>
  }
}

const SuggestedGenesContainer = createFragmentContainer(
  SuggestedGenesContent,
  graphql`
    fragment SuggestedGenesContent_suggested_genes on Gene
      @relay(plural: true) {
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

const SuggestedGenesComponent: React.SFC<ContextProps & FollowProps> = ({
  relayEnvironment,
  updateFollowCount,
}) => {
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
          return (
            <SuggestedGenesContainer
              suggested_genes={props.suggested_genes}
              updateFollowCount={updateFollowCount}
            />
          )
        } else if (error) {
          // TODO: Properly handle error
          console.error(error)
          return null
        } else {
          return null
        }
      }}
    />
  )
}

export const SuggestedGenes = ContextConsumer(SuggestedGenesComponent)
