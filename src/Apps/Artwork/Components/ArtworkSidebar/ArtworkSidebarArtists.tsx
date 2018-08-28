import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowIcon } from "Styleguide/Components"
import { Box } from "Styleguide/Elements"

import { ArtworkSidebarArtists_artwork } from "__generated__/ArtworkSidebarArtists_artwork.graphql"

export interface ArtistsProps {
  artwork: ArtworkSidebarArtists_artwork
}

type Artist = ArtworkSidebarArtists_artwork["artists"][0]

export class ArtworkSidebarArtists extends React.Component<ArtistsProps> {
  private renderArtistName(artist: Artist) {
    return artist.href ? (
      <Serif size="5t" display="inline-block" weight="semibold">
        <a href={artist.href}>{artist.name}</a>
      </Serif>
    ) : (
      <Serif size="5t" display="inline-block" weight="semibold">
        {artist.name}
      </Serif>
    )
  }

  private renderSingleArtist(artist: Artist) {
    return (
      <React.Fragment>
        {this.renderArtistName(artist)}
        <FollowIcon is_followed={artist.is_followed} />
      </React.Fragment>
    )
  }

  renderMultipleArtists() {
    const {
      artwork: { artists },
    } = this.props
    return artists.map((artist, index) => {
      return (
        <React.Fragment key={artist.__id}>
          {this.renderArtistName(artist)}
          {index !== artists.length - 1 && ", "}
        </React.Fragment>
      )
    })
  }

  render() {
    const {
      artwork: { artists },
    } = this.props
    return (
      <Box pb={2}>
        {artists.length === 1
          ? this.renderSingleArtist(artists[0])
          : this.renderMultipleArtists()}
      </Box>
    )
  }
}

export const ArtworkSidebarArtistsFragmentContainer = createFragmentContainer(
  ArtworkSidebarArtists,
  graphql`
    fragment ArtworkSidebarArtists_artwork on Artwork {
      artists {
        __id
        id
        name
        is_followed
        href
      }
    }
  `
)
