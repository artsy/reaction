import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import ItemLink from "./ItemLink"

interface Props {
  artists: any[]
}

class SelectableItemContainer extends React.Component<Props, null> {
  render() {
    const items = this.props.artists.map((artist, index) => <ItemLink href="#" artist={artist} key={index} />)

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
