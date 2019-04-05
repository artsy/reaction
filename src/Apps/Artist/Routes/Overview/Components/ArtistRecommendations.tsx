import { Serif } from "@artsy/palette"
import { ArtistRecommendations_artist } from "__generated__/ArtistRecommendations_artist.graphql"
import { ArtistRecommendationsQuery } from "__generated__/ArtistRecommendationsQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { useContext } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { get } from "Utils/get"
import { RecommendedArtistFragmentContainer as RecommendedArtist } from "./RecommendedArtist"

interface ArtistRecommendationsProps {
  artist: ArtistRecommendations_artist
}

export const ArtistRecommendations: React.FC<ArtistRecommendationsProps> = ({
  artist,
}) => {
  const { name } = artist
  const relatedArtists = get(artist, a => a.related.artists.edges, []).map(
    edge => <RecommendedArtist artist={edge.node} key={edge.node.__id} />
  )

  return (
    <div>
      <Serif size="8" color="black100">
        Related to {name}
      </Serif>
      {relatedArtists}
    </div>
  )
}

export const ArtistRecommendationsFragmentContainer = createFragmentContainer(
  ArtistRecommendations,
  graphql`
    fragment ArtistRecommendations_artist on Artist {
      name
      related {
        artists(first: 3) {
          edges {
            node {
              __id
              ...RecommendedArtist_artist
            }
          }
        }
      }
    }
  `
)

export const ArtistRecommendationsQueryRenderer: React.FC<{
  artistID: string
}> = ({ artistID }) => {
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
      variables={{ artistID }}
      render={renderWithLoadProgress(ArtistRecommendationsFragmentContainer)}
    />
  )
}
