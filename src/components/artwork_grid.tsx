import * as React from "react"
import Artwork from "./artwork/index"
import styled from "styled-components"

export interface GridProps extends React.HTMLProps<ArtworkGrid> {
  artworks?: any,
  columnCount?: number,
  sectionMargin?: number,
  itemMargin?: number,
}

export class ArtworkGrid extends React.Component<GridProps, null> {
  public static defaultProps: GridProps

  sectionedArtworks() {
    const sectionedArtworks = []
    const sectionRatioSums = []
    const artworks = this.props.artworks ? this.props.artworks.edges : []

    for (let i = 0; i < this.props.columnCount; i++) {
      sectionedArtworks.push([])
      sectionRatioSums.push(0)
    }

    for (let i = 0; i < artworks.length; i++) {
      const artwork = artworks[i].node

      // There are artworks without images and other ‘issues’. Like Force we’re just going to reject those for now.
      // See: https://github.com/artsy/eigen/issues/1667
      if (artwork.image) {
        // Find section with lowest *inverted* aspect ratio sum, which is the shortest column.
        let lowestRatioSum = Number.MAX_VALUE 
        let sectionIndex = null
        for (let j = 0; j < sectionRatioSums.length; j++) {
          const ratioSum = sectionRatioSums[j]
          if (ratioSum < lowestRatioSum) {
            sectionIndex = j
            lowestRatioSum = ratioSum
          }
        }

        if (sectionIndex != null) {
          const section = sectionedArtworks[sectionIndex]
          section.push(artwork)

          // Keep track of total section aspect ratio
          const aspectRatio = artwork.image.aspect_ratio || 1 // Ensure we never divide by null/0
          // Invert the aspect ratio so that a lower value means a shorter section.
          sectionRatioSums[sectionIndex] += (1 / aspectRatio)
        }
      }
    }

    return sectionedArtworks
  }

  renderSections() {
    const spacerStyle = {
      height: this.props.itemMargin,
    }
    const artworks = this.props.artworks ? this.props.artworks.edges : []
    const sectionedArtworks = this.sectionedArtworks()
    const sections = []

    for (let i = 0; i < this.props.columnCount; i++) {
      const artworkComponents = []
      for (let j = 0; j < sectionedArtworks[i].length; j++) {
        const artwork = sectionedArtworks[i][j]
        artworkComponents.push(
          <Artwork
            artwork={artwork}
            key={'artwork-' + j + '-' + artwork.id}
          />)
        // Setting a marginBottom on the artwork component didn’t work, so using a spacer view instead.
        if (j < artworks.length - 1) {
          artworkComponents.push(
            <div style={spacerStyle} key={'spacer-' + j + '-' + artwork.id} />
          )
        }
      }

      const sectionSpecificStyle = {
        flex: 1,
        marginRight: (i === this.props.columnCount - 1 ? 0 : this.props.sectionMargin),
      }

      sections.push(
        <div style={sectionSpecificStyle} key={i}>
          {artworkComponents}
        </div>
      )
    }
    return sections
  }

  render() {
    const artworks = this.renderSections() || []
    return (
      <div className={this.props.className}>
        {artworks}
      </div>
    )
  }
}

ArtworkGrid.defaultProps = {
  columnCount: 3,
  sectionMargin: 20,
  itemMargin: 20
}

export const StyledGrid = styled(ArtworkGrid)`
  display: flex
`

export default StyledGrid