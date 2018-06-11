import React from "react"
import { Serif } from "@artsy/palette"
import { FollowButton } from "../../../../Components/Follow"

interface ArtistsProps {
  artists: Array<{
    readonly __id: string
    readonly id: string
    readonly name: string
    readonly is_followed: boolean | null
    readonly href?: string
  }>
}

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

  render() {
    const { artists } = this.props
    if (artists.length === 1) {
      const artist = artists[0]
      return (
        <React.Fragment>
          {this.renderArtistName(artist)}
          <FollowButton artist={artist} />
        </React.Fragment>
      )
    } else {
      return artists.map((artist, index) => {
        return (
          <React.Fragment>
            {this.renderArtistName(artist)}
            {index !== artists.length - 1 ? ", " : ""}
          </React.Fragment>
        )
      })
    }
  }
}
