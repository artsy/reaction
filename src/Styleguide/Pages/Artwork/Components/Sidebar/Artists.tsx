import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { FollowIcon } from "Styleguide/Elements/FollowIcon"

export interface ArtistsProps {
  artists: Array<{
    readonly __id: string
    readonly id: string
    readonly name: string
    readonly is_followed: boolean | null
    readonly href?: string
  }>
}

const ArtistsContainer = Box

export class Artists extends React.Component<ArtistsProps> {
  renderArtistName(artist) {
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

  renderSingleArtist(artist) {
    return (
      <React.Fragment>
        {this.renderArtistName(artist)}
        <FollowIcon is_followed={artist.is_followed} />
      </React.Fragment>
    )
  }

  renderMultipleArtists() {
    const { artists } = this.props
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
    const { artists } = this.props
    return (
      <ArtistsContainer pb={2}>
        {artists.length === 1
          ? this.renderSingleArtist(artists[0])
          : this.renderMultipleArtists()}
      </ArtistsContainer>
    )
  }
}
