import React from "react"
import { Serif } from "@artsy/palette"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"
import { FollowIcon } from "Styleguide/Elements/FollowIcon"

interface ArtistsProps {
  artists: Array<{
    readonly __id: string
    readonly id: string
    readonly name: string
    readonly is_followed: boolean | null
    readonly href?: string
  }>
}

const ArtistsContainer = styled.div.attrs<SpaceProps>({})`
  ${space};
`

export class Artists extends React.Component<ArtistsProps> {
  renderArtistName(artist) {
    return artist.href ? (
      <Serif size="5t" display="inline-block">
        <a href={artist.href}>{artist.name}</a>
      </Serif>
    ) : (
      <Serif size="5t" display="inline-block">
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

  renderMultipleArtists(artists) {
    return artists.map((artist, index) => {
      return (
        <React.Fragment>
          {this.renderArtistName(artist)}
          {index !== artists.length - 1 && ", "}
        </React.Fragment>
      )
    })
  }

  render() {
    const { artists } = this.props
    return (
      <ArtistsContainer pb={4}>
        {artists.length === 1
          ? this.renderSingleArtist(artists[0])
          : this.renderMultipleArtists(artists)}
      </ArtistsContainer>
    )
  }
}
