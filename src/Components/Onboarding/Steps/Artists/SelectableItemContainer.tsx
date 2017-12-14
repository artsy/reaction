import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import ItemLink from "./ItemLink"

interface Props {
  artists: any[]
  onArtistFollowed(artist: string, store: RecordSourceSelectorProxy, data: SelectorData): void
}

class SelectableItemContainer extends React.Component<Props, null> {
  render() {
    const items = this.props.artists && this.props.artists.map((artist, index) =>
      <ItemLink href="#" artist={artist} key={index} onArtistFollowed={this.props.onArtistFollowed} />)

    return <div>{items}</div>
  }
}

export default createFragmentContainer(
  SelectableItemContainer,
  graphql`
    fragment SelectableItemContainer_artists on Artist @relay(plural: true) {
      ...ItemLink_artist
    }
  `
)
