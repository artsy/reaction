import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import Fillwidth from "../Artwork/Fillwidth"
import Follow from "../Follow"
import Text from "../Text"

interface Props extends RelayProps, React.HTMLProps<ArtistRow> {}

export class ArtistRow extends React.Component<Props, null> {
  render() {
    const { artist } = this.props
    return (
      <Container>
        <Header>
          <Text textSize="small" textStyle="primary">
            {artist.name}
          </Text>
          <Follow artist={artist as any} />
        </Header>
        <Fillwidth artworks={artist.artworks} />
      </Container>
    )
  }
}

const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const Container = styled.div`
  margin-bottom: 60px;
`

export default createFragmentContainer(
  ArtistRow,
  graphql`
    fragment ArtistRow_artist on Artist {
      name
      ...Follow_artist
      artworks: artworks_connection(first: 6) {
        ...Fillwidth_artworks
      }
    }
  `
)

interface RelayProps {
  artist: {
    name: string | null
    artworks: any
  }
}
