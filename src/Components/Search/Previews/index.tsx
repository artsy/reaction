import { SearchBarState } from "Components/Search/state"
import React from "react"
import { Subscribe } from "unstated"
import { Media } from "Utils/Responsive"
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
        <Preview {...rest} />
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
      <Subscribe to={[SearchBarState]}>
        {(searchState: SearchBarState) => {
          return <SearchPreview {...this.props} searchState={searchState} />
        }}
      </Subscribe>
    )
  }
}
