import { Box, Serif } from "@artsy/palette"
import { ContextConsumer } from "Artsy/Router"

import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowIcon } from "Styleguide/Components"

import { ArtworkSidebarArtists_artwork } from "__generated__/ArtworkSidebarArtists_artwork.graphql"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"

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

  private renderSingleArtist(artist: Artist, user, mediator) {
    return (
      <React.Fragment>
        {this.renderArtistName(artist)}
        <FollowArtistButton
          artist={artist}
          user={user}
          onOpenAuthModal={() => {
            mediator.trigger("open:auth", {
              mode: "signup",
              copy: `Sign up to follow ${artist.name}`,
              signupIntent: "follow artist",
              afterSignUpAction: {
                kind: "artist",
                action: "follow",
                objectId: artist.id,
              },
            })
          }}
          render={({ is_followed }) => {
            return <FollowIcon isFollowed={is_followed} />
          }}
        >
          Follow
        </FollowArtistButton>
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
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Box>
              {artists.length === 1
                ? this.renderSingleArtist(artists[0], user, mediator)
                : this.renderMultipleArtists()}
            </Box>
          )
        }}
      </ContextConsumer>
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
        href
        ...FollowArtistButton_artist
      }
    }
  `
)
