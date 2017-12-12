import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "../Artsy"
import Artists from "./Artists"
import Artworks from "./Artworks"

interface Filters {
  for_sale: boolean
  dimension_range: string
  price_range: string
  medium: string
}

interface Props extends ContextProps {
  mode: "artists" | "artworks"
  filters?: Filters
  geneID: string
}

interface State extends Filters {
  mode: "artists" | "artworks"
}

class GeneNewContents extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      for_sale: null,
      medium: "*",
      price_range: "*",
      dimension_range: "*",
      mode: props.mode,
    }
  }

  onDropdownSelect(slice: string, value: string) {
    this.setState({
      [slice.toLowerCase() as any]: value,
      mode: "artworks",
    })
  }

  renderArtists() {
    const { geneID, relayEnvironment } = this.props
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query NewContentsArtistsQuery($geneID: String!) {
            gene(id: $geneID) {
              ...Artists_gene
            }
          }
        `}
        variables={{ geneID }}
        render={({ props }) => {
          if (props) {
            return <Artists gene={props.gene} onDropdownSelected={this.onDropdownSelect.bind(this)} />
          } else {
            return null
          }
        }}
      />
    )
  }

  renderArtworks() {
    const { geneID, relayEnvironment } = this.props
    const { for_sale, medium, price_range, dimension_range } = this.state
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql.experimental`
          query NewContentsArtworksQuery($geneID: String!, $medium: String
          $price_range: String
          $dimension_range: String) {
            gene(id: $geneID) {
              ...Artworks_gene @arguments(medium: $medium, price_range: $price_range, dimension_range: $dimension_range)
            }
          }
        `}
        variables={{ geneID, ...this.state }}
        render={({ props }) => {
          if (props) {
            return <Artworks for_sale={for_sale} medium={medium} price_range={price_range} dimension_range={dimension_range} gene={props.gene} onDropdownSelected={this.onDropdownSelect.bind(this)} />
          } else {
            return null
          }
        }}
      />
    )
  }

  render() {
    const { filters } = this.props
    const { mode } = this.state
    if (mode === "artists" && !filters) {
      return this.renderArtists()
    }
    return this.renderArtworks()
  }
}

export const NewContents = ContextConsumer(GeneNewContents)
