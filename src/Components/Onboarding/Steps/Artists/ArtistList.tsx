import * as React from "react"

import PopularArtists from "./PopularArtists"

export interface Props {
  searchQuery: string
}

export default class ArtistList extends React.Component<Props, any> {
  // if searchQ "" show pop else show filtered artists with this prop= Q

  render() {
    return <PopularArtists />
  }
}
