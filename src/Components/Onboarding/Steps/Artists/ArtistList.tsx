import * as React from "react"

import ArtistSearchResults from "./ArtistSearchResults"
// import PopularArtists from "./PopularArtists"

export interface Props {
  searchQuery: string
}

export default class ArtistList extends React.Component<Props, any> {
  render() {
    return <ArtistSearchResults />
    // return <PopularArtists />
  }
}
