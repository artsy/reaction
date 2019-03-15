import { Box, Separator, Spacer } from "@artsy/palette"
import { SearchResultsArtistsRoute_viewer } from "__generated__/SearchResultsArtistsRoute_viewer.graphql"
import { GenericSearchResultItem } from "Apps/Search/Components/GenericSearchResultItem"
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
            <GenericSearchResultItem
              name={artist.name}
              description={artist.bio}
              imageUrl={artist.imageUrl}
              index={index}
              entityType="Artist"
              href={artist.href}
            />
            {index < artists.length - 1 ? (
              <>
                <Spacer mb={3} />
                <Separator />
                <Spacer mb={3} />
              </>
            ) : (
              <Spacer mb={3} />
            )}
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
              href
              imageUrl
              bio
            }
          }
        }
      }
    }
  `
)
