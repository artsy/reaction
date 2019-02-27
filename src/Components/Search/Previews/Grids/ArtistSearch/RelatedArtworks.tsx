import { Box, Flex, Sans } from "@artsy/palette"
import { SearchBarState } from "Components/Search/state"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Subscribe } from "unstated"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"

import { RelatedArtworksPreview_viewer } from "__generated__/RelatedArtworksPreview_viewer.graphql"
import { PreviewGridItemFragmentContainer as PreviewGridItem } from "../PreviewGridItem"
import { NoResultsPreview } from "./NoResults"

interface RelatedArtworksPreviewProps {
  viewer: RelatedArtworksPreview_viewer
  searchState?: SearchBarState
}
export class RelatedArtworksPreview extends React.Component<
  RelatedArtworksPreviewProps
> {
  componentDidMount() {
    const items = get(
      this.props.viewer,
      x => x.filter_artworks.artworks_connection.edges,
      []
    ).map(x => x.node)

    this.props.searchState.registerItems(items)
  }

  render() {
    const { viewer, searchState } = this.props

    const artworks = get(
      viewer,
      x => x.filter_artworks.artworks_connection.edges,
      []
    ).map(x => x.node)

    const { state } = searchState

    if (artworks.length === 0) {
      return <NoResultsPreview />
    }

    const relatedArtworks = artworks.map((artwork, i) => {
      return (
        <Box width={["0%", "100%", "100%", "50%"]} key={i}>
          <PreviewGridItem
            artwork={artwork}
            highlight={
              state.hasEnteredPreviews && i === state.selectedPreviewIndex
            }
            emphasizeArtist
          />
        </Box>
      )
    })
    return (
      <Box>
        <Sans size="3" weight="medium" color="black100" mb={2}>
          Related Artworks
        </Sans>

        <Media lessThan="lg">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {relatedArtworks.slice(0, 5)}
          </Flex>
        </Media>

        <Media greaterThan="md">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {relatedArtworks}
          </Flex>
        </Media>
      </Box>
    )
  }
}

export const RelatedArtworksPreviewFragmentContainer = createFragmentContainer(
  (props: RelatedArtworksPreviewProps) => {
    return (
      <Subscribe to={[SearchBarState]}>
        {(searchState: SearchBarState) => {
          return <RelatedArtworksPreview searchState={searchState} {...props} />
        }}
      </Subscribe>
    )
  },

  graphql`
    fragment RelatedArtworksPreview_viewer on Viewer
      @argumentDefinitions(entityID: { type: "String!" }) {
      filter_artworks(
        aggregations: [TOTAL]
        sort: "-decayed_merch"
        artist_id: $entityID
      ) {
        __id
        artworks_connection(first: 10) {
          edges {
            node {
              href
              ...PreviewGridItem_artwork
            }
          }
        }
      }
    }
  `
)
