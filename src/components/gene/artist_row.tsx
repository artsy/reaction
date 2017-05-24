import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Fillwidth from "../artwork/fillwidth"
import FollowButton from "../follow"
import Text from "../text"


interface Props extends RelayProps, React.HTMLProps<ArtistRow> {
  artist: any
}

export class ArtistRow extends React.Component<Props, null> {

  render() {
    const { artist } = this.props
    return (
      <div>
        <Header>
          <Text textSize="small" textStyle="primary">
            {artist.name}
          </Text>
          <FollowButton artist={artist}/>
        </Header>
        <Fillwidth artworks={artist.artworks as any} />
      </div>
    )
  }
}

const Header = styled.div`
  display: flex;
`

export default Relay.createContainer(ArtistRow, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        name
        ${FollowButton.getFragment("artist")}
        artworks: artworks_connection(first: 6) {
          ${Fillwidth.getFragment("artworks")}
        }
      }
    `,
  },
})



interface RelayProps {
  gene: {
    mode: string | null,
    name: string | null,
  } | any
}
