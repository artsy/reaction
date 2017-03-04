import * as React from "react"
import * as Relay from "react-relay"

import Artwork from "./artwork/index"

export class ArtworkGrid extends React.Component<RelayProps, null> {
  render() {
    const column1Artworks = this.props.artist.artworks.filter((_, index) => (index % 2) === 0)
    const column2Artworks = this.props.artist.artworks.filter((_, index) => (index % 2) === 1)
    return (
      <div>
        <div style={{ width: 200, float: "left" }}>
          {column1Artworks.map(artwork => <Artwork artwork={artwork as any} key={artwork.__id} />)}
        </div>
        <div style={{ width: 200, float: "left" }}>
          {column2Artworks.map(artwork => <Artwork artwork={artwork as any} key={artwork.__id} />)}
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(ArtworkGrid, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        artworks {
          __id
          ${Artwork.getFragment("artwork")}
        }
      }
    `,
  },
})

interface RelayProps {
  artist: {
    artworks: Array<{
      __id: string,
    } | null> | null,
  },
}
