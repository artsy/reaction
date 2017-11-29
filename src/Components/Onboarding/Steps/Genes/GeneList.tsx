import * as React from "react"

import { GeneSearchResults } from "./GeneSearchResults"
import { SuggestedGenes } from "./SuggestedGenes"

export interface Props {
  searchQuery: string
}

export default class GeneList extends React.Component<Props, any> {
  render() {
    if (this.props.searchQuery.length > 0) {
      return <GeneSearchResults term={this.props.searchQuery} />
    }
    return <SuggestedGenes />
  }
}
