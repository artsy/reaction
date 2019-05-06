import { ArtistRow_artist } from "__generated__/ArtistRow_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import Fillwidth from "../Artwork/Fillwidth"
import Follow from "../Follow"
import Text from "../Text"
import TextLink from "../TextLink"

interface Props extends React.HTMLProps<ArtistRow> {
  artist: ArtistRow_artist
}

export class ArtistRow extends React.Component<Props, null> {
  render() {
    const { artist } = this.props
    return (
      <Container>
        <Header>
          <TextLink href={artist.href}>
            <Text textSize="small" textStyle="primary">
              {artist.name}
            </Text>
          </TextLink>
          <Follow artist={artist} />
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

export default createFragmentContainer(ArtistRow, {
  artist: graphql`
    fragment ArtistRow_artist on Artist {
      name
      href
      ...Follow_artist
      artworks: artworks_connection(first: 6) {
        ...Fillwidth_artworks
      }
    }
  `,
})
