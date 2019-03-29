import { Serif } from "@artsy/palette"
import { ArtistRecommendations_artist } from "__generated__/ArtistRecommendations_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistRecommendationsProps {
  artist: ArtistRecommendations_artist
}

export const ArtistRecommendations: React.FC<
  ArtistRecommendationsProps
> = props => {
  const {
    artist: { name },
  } = props

  return (
    <div>
      <Serif size="8" color="black100">
        Related to {name}
      </Serif>
    </div>
  )
}

export const ArtistRecommendationsFragmentContainer = createFragmentContainer(
  ArtistRecommendations,
  graphql`
    fragment ArtistRecommendations_artist on Artist {
      name
    }
  `
)
