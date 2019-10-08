import { Box, Button, Flex, Serif } from "@artsy/palette"
import { ArtistRecommendations_artist } from "__generated__/ArtistRecommendations_artist.graphql"
import { ArtistRecommendationsRendererQuery } from "__generated__/ArtistRecommendationsRendererQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import React, { useContext, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { RecommendedArtistFragmentContainer as RecommendedArtist } from "./RecommendedArtist"

const logger = createLogger("ArtistRecommendations.tsx")

interface ArtistRecommendationsProps {
  artist: ArtistRecommendations_artist
  relay: RelayPaginationProp
}

const PAGE_SIZE = 3

export const ArtistRecommendations: React.FC<ArtistRecommendationsProps> = ({
  artist,
  relay,
}) => {
  const [fetchingNextPage, setFetchingNextPage] = useState(false)

  const { name } = artist
  const relatedArtists = get(artist, a => a.related.artists.edges, []).map(
    edge => <RecommendedArtist artist={edge.node} key={edge.node.id} />
  )

  const fetchData = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }
    setFetchingNextPage(true)
    relay.loadMore(PAGE_SIZE, error => {
      if (error) {
        logger.error(error)
      }
      setFetchingNextPage(false)
    })
  }

  return (
    <Box>
      <Serif size="8" color="black100">
        Related to {name}
      </Serif>
      {relatedArtists}

      {relay.hasMore() && (
        <ShowMoreButton onClick={fetchData} loading={fetchingNextPage} />
      )}
    </Box>
  )
}

const ShowMoreButton: React.FC<{ onClick: () => void; loading: boolean }> = ({
  onClick,
  loading,
}) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Button
        my={4}
        variant="secondaryOutline"
        onClick={onClick}
        loading={loading}
      >
        Show More
      </Button>
    </Flex>
  )
}

export const ArtistRecommendationsPaginationContainer = createPaginationContainer(
  ArtistRecommendations,
  {
    artist: graphql`
      fragment ArtistRecommendations_artist on Artist
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 3 }
          cursor: { type: "String", defaultValue: "" }
          min_forsale_artworks: { type: "Int", defaultValue: 7 }
        ) {
        id
        name
        related {
          artists(
            first: $count
            after: $cursor
            min_forsale_artworks: $min_forsale_artworks
          ) @connection(key: "ArtistRecommendations_artists") {
            edges {
              node {
                id
                ...RecommendedArtist_artist
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.artist.related.artists
    },
    getFragmentVariables(prevVars, count) {
      return {
        ...prevVars,
        count,
      }
    },
    getVariables(
      props: ArtistRecommendationsProps,
      { count, cursor },
      fragmentVariables
    ) {
      return {
        ...fragmentVariables,
        count,
        cursor,
        artistID: props.artist.id,
      }
    },
    query: graphql`
      query ArtistRecommendationsPaginationQuery(
        $count: Int!
        $cursor: String
        $artistID: String!
      ) {
        artist(id: $artistID) {
          ...ArtistRecommendations_artist
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)

export const ArtistRecommendationsQueryRenderer: React.FC<{
  artistID: string
}> = ({ artistID }) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <QueryRenderer<ArtistRecommendationsRendererQuery>
      environment={relayEnvironment}
      query={graphql`
        query ArtistRecommendationsRendererQuery($artistID: String!) {
          artist(id: $artistID) {
            ...ArtistRecommendations_artist
          }
        }
      `}
      variables={{ artistID }}
      render={renderWithLoadProgress(ArtistRecommendationsPaginationContainer)}
    />
  )
}
