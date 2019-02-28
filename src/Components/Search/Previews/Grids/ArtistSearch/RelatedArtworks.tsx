import { Box, Flex, Sans, space } from "@artsy/palette"
import { SearchBarState } from "Components/Search/state"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Subscribe } from "unstated"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"

import { RelatedArtworksPreview_viewer } from "__generated__/RelatedArtworksPreview_viewer.graphql"
import styled from "styled-components"
import { PreviewGridItemFragmentContainer as PreviewGridItem } from "../PreviewGridItem"
import { NoResultsPreview } from "./NoResults"

interface RelatedArtworksPreviewProps {
  viewer: RelatedArtworksPreview_viewer
  searchState?: SearchBarState
}

const ItemContainer = styled(Box)<{ itemsPerRow: 1 | 2 }>`
  &:nth-child(even) {
    margin-left: ${p => (p.itemsPerRow === 2 ? space(2) : 0)}px;
  }
`

export class RelatedArtworksPreview extends React.Component<
  RelatedArtworksPreviewProps
> {
  componentDidMount() {
    this.props.searchState.registerItems(this.artworks)
  }

  get artworks(): any {
    return get(
      this.props.viewer,
      x => x.filter_artworks.artworks_connection.edges,
      []
    ).map(x => x.node)
  }

  renderItems(itemsPerRow: 1 | 2) {
    const displayedArtworks =
      itemsPerRow === 1 ? this.artworks.slice(0, 5) : this.artworks

    const {
      searchState: { state },
    } = this.props

    return displayedArtworks.map((artwork, i) => (
      <ItemContainer width={["0%", "180px"]} key={i} itemsPerRow={itemsPerRow}>
        <PreviewGridItem
          artwork={artwork}
          highlight={
            state.hasEnteredPreviews && i === state.selectedPreviewIndex
          }
          emphasizeArtist
        />
      </ItemContainer>
    ))
  }

  render() {
    if (this.artworks.length === 0) {
      return <NoResultsPreview />
    }

    return (
      <Box>
        <Sans size="3" weight="medium" color="black100" mb={2}>
          Related Artworks
        </Sans>

        <Media lessThan="lg">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {this.renderItems(1)}
          </Flex>
        </Media>

        <Media greaterThan="md">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {this.renderItems(2)}
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
