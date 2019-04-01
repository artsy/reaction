import { Serif } from "@artsy/palette"
import { ArtistRecommendations_artist } from "__generated__/ArtistRecommendations_artist.graphql"
import { ArtistRecommendationsQuery } from "__generated__/ArtistRecommendationsQuery.graphql"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { useContext } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

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

export const ArtistRecommendationsQueryRenderer: React.FC<{
  artist: Overview_artist
}> = ({ artist }) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <QueryRenderer<ArtistRecommendationsQuery>
      environment={relayEnvironment}
      query={graphql`
        query ArtistRecommendationsQuery($artistID: String!) {
          artist(id: $artistID) {
            ...ArtistRecommendations_artist
          }
        }
      `}
      variables={{ artistID: artist.id }}
      render={renderWithLoadProgress(ArtistRecommendationsFragmentContainer)}
    />
  )
}
