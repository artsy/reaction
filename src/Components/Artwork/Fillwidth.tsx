import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import sizeMe from "react-sizeme"
import styled from "styled-components"

import fillwidthDimensions from "../../Utils/fillwidth"
import FillwidthItem from "./FillwidthItem"

import { find } from "lodash"

interface RelayProps {
  artworks: {
    edges: Array<{
      node: any
    } | null> | null
  }
}

interface Props extends RelayProps, React.HTMLAttributes<Fillwidth> {
  targetHeight?: number
  gutter?: number
  size?: any
}

export class Fillwidth extends React.Component<Props, null> {
  public static defaultProps: Partial<Props>

  renderArtwork(artwork, dimensions, i) {
    const { gutter } = this.props
    const artworkSize = find(dimensions, ["__id", artwork.__id])
    return (
      <FillwidthItem
        artwork={artwork as any}
        key={"artwork--" + artwork.__id}
        targetHeight={artworkSize.height}
        imageHeight={artworkSize.height}
        width={artworkSize.width}
        margin={i === dimensions.length - 1 ? 0 : gutter}
      />
    )
  }

  render() {
    const artworks = this.props.artworks.edges
    const dimensions = fillwidthDimensions(
      this.props.artworks.edges,
      this.props.size.width,
      this.props.gutter,
      this.props.targetHeight
    )
    return (
      <div className={this.props.className}>
        {artworks.map((artwork, i) =>
          this.renderArtwork(artwork.node, dimensions, i)
        )}
      </div>
    )
  }
}

const StyledFillwidth = styled(Fillwidth)`
  margin-bottom: 50px;
`

StyledFillwidth.defaultProps = {
  targetHeight: 180,
  gutter: 10,
}

const sizeMeOptions = {
  monitorHeight: false,
  refreshRate: 64,
  refreshMode: "debounce",
}

const FillwidthDimensions = sizeMe(sizeMeOptions)(
  StyledFillwidth
) as React.StatelessComponent<Props>

export default createFragmentContainer(
  FillwidthDimensions,
  graphql`
    fragment Fillwidth_artworks on ArtworkConnection {
      edges {
        node {
          __id
          image {
            aspect_ratio
          }
          ...FillwidthItem_artwork
        }
      }
    }
  `
)
