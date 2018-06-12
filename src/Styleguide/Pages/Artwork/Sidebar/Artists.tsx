import React from "react"
import { Serif } from "@artsy/palette"
import styled from "styled-components"
import { FollowIcon } from "../../../Elements/FollowIcon"

interface ArtistsProps {
  artists: Array<{
    readonly __id: string
    readonly id: string
    readonly name: string
    readonly is_followed: boolean | null
    readonly href?: string
  }>
}

const Artist = styled.div``
const ArtistsContainer = styled.div``

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

  renderArtists(artists) {
    return artists.map((artist, index) => {
      return (
        <React.Fragment>
          {this.renderArtistName(artist)}
          {index !== artists.length - 1 ? ", " : ""}
        </React.Fragment>
      )
    })
  }

  render() {
    const { artists } = this.props
    if (artists.length === 1) {
      const artist = artists[0]
      return (
        <Artist>
          {this.renderArtistName(artist)}
          <FollowIcon is_followed={artist.is_followed} />
        </Artist>
      )
    } else {
      return <ArtistsContainer>{this.renderArtists(artists)}</ArtistsContainer>
    }
  }
}
