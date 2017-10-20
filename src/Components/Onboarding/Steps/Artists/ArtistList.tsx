import * as React from "react"

import { ArtistSearchResults } from "./ArtistSearchResults"
import PopularArtists from "./PopularArtists"

export interface Props {
  searchQuery: string
}

export default class ArtistList extends React.Component<Props, any> {
  render() {
    if (this.props.searchQuery.length > 0) {
      return <ArtistSearchResults term={this.props.searchQuery} />
    }
    return <PopularArtists />
  }
}
