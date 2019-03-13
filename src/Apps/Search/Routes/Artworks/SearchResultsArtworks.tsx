import { Box, Spacer } from "@artsy/palette"
import { SearchResultsArtworksRoute_viewer } from "__generated__/SearchResultsArtworksRoute_viewer.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

export interface Props {
  viewer: SearchResultsArtworksRoute_viewer
}

export const SearchResultsArtworksRoute: SFC<Props> = props => {
  const { viewer } = props

  const artworks = get(viewer, v => v.search.edges, []).map(e => e.node)
  return (
    <>
      {artworks.map((artwork, index) => {
        return (
          <Box key={index}>
            {artwork.title}, {artwork.date} by {artwork.artist_names}
            <Spacer mb={3} />
          </Box>
        )
      })}
    </>
  )
}

export const SearchResultsArtworksRouteFragmentContainer = createFragmentContainer(
  SearchResultsArtworksRoute,
  graphql`
    fragment SearchResultsArtworksRoute_viewer on Viewer
      @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
      search(query: $term, first: 10, entities: [ARTWORK]) {
        edges {
          node {
            ... on Artwork {
              title
              artist_names
              date
            }
          }
        }
      }
    }
  `
)
