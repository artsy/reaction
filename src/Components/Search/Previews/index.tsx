import { Box } from "@artsy/palette"
import React from "react"
import { Media } from "Utils/Responsive"
import { SearchBarConsumer, SearchBarState } from "../SearchBarContext"
import { ArtistSearchPreviewQueryRenderer as ArtistSearchPreview } from "./Grids/ArtistSearch"
import { MerchandisableArtworksPreviewQueryRenderer as MerchandisableArtworksPreview } from "./Grids/MerchandisableArtworks"

export interface SearchPreviewProps {
  entityID: string
  entityType: string
  searchState: SearchBarState
}

const previewComponents = {
  Artist: ArtistSearchPreview,
  default: MerchandisableArtworksPreview,
}

class SearchPreview extends React.Component<SearchPreviewProps> {
  componentWillUnmount() {
    this.props.searchState.clearPreviewItems()
  }

  render() {
    const { entityType, ...rest } = this.props
    const Preview = previewComponents[entityType] || previewComponents.default

    return (
      <Media greaterThan="xs">
        <Box
          onMouseOver={() =>
            this.props.searchState.enterPreviewWithoutSelection()
          }
          onMouseOut={() => this.props.searchState.leavePreviewIfNoSelection()}
          height="100%"
        >
          <Preview {...rest} />
        </Box>
      </Media>
    )
  }
}

export class SearchPreviewWrapper extends React.Component<{
  entityID: string
  entityType: string
}> {
  render() {
    return (
      <SearchBarConsumer>
        {(searchState: SearchBarState) => {
          return <SearchPreview {...this.props} searchState={searchState} />
        }}
      </SearchBarConsumer>
    )
  }
}
