import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "../../../Artsy"
import ItemLink from "../../ItemLink"

class SuggestedGenesContent extends React.Component<RelayProps, null> {
  render() {
    const items = this.props.suggested_genes.map((item, index) => {
      return <ItemLink href="#" item={item} key={index} />
    })

    return <div>{items}</div>
  }
}

const SuggestedGenesContainer = createFragmentContainer(
  SuggestedGenesContent,
  graphql`
    fragment SuggestedGenesContent_suggested_genes on SuggestedGene @relay(plural: true) {
      id
      name
      _id
      image_url
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

export interface RelayProps {
  suggested_genes: [
    {
      id: string | null
      name: string | null
      _id: string | null
      image_url: string | null
    }
  ]
}

export const SuggestedGenes = ContextConsumer(SuggestedGenesComponent)
