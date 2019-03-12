import { Box, Spacer } from "@artsy/palette"
import { SearchResultsArtistsRoute_viewer } from "__generated__/SearchResultsArtistsRoute_viewer.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

export interface Props {
  viewer: SearchResultsArtistsRoute_viewer
}

export const SearchResultsArtistsRoute: SFC<Props> = props => {
  const { viewer } = props

  const artists = get(viewer, v => v.search.edges, []).map(e => e.node)
  return (
    <>
      {artists.map((artist, index) => {
        return (
          <Box key={index}>
            {artist.name}
            <Spacer mb={3} />
          </Box>
        )
      })}
    </>
  )
}

export const SearchResultsArtistsRouteFragmentContainer = createFragmentContainer(
  SearchResultsArtistsRoute,
  graphql`
    fragment SearchResultsArtistsRoute_viewer on Viewer
      @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
      search(query: $term, first: 10, entities: [ARTIST]) {
        edges {
          node {
            ... on Artist {
              name
            }
          }
        }
      }
    }
  `
)
