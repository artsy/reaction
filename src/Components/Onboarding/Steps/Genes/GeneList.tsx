import * as React from "react"

import fixture from "./Fixture"

import SuggestedGenes from "./SuggestedGenes"

export interface Props {
  searchQuery: string
}

export default class ArtistList extends React.Component<Props, any> {
  render() {
    // if (this.props.searchQuery.length > 0) {
    //   return <ArtistSearchResults term={this.props.searchQuery} />
    // }
    return <SuggestedGenes genes={fixture} />
  }
}
