import * as React from "react"
import * as Relay from "react-relay"

import sizeMe from "react-sizeme"
import styled from "styled-components"
import getDimensions from "../fillwidth"
import Artwork from "./fillwidth_item"

import { find, reduce } from "lodash"

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

/**
 * Scales an image object proportionally based on a direction (either -1 or 1)
 * @param img a dimension object that references an artwork image
 * @param dir the direction we need to scale an image, either -1 or 1
 */
// const resizeHeight = (img, dir) => {
//   img.width += img.width / img.height * dir
//   img.height += dir
// }

export class Fillwidth extends React.Component<Props, null> {
  public static defaultProps: Partial<Props>

  // totalWhitespace() {
  //   const artworks = this.props.artworks.edges
  //   return (artworks.length - 1) * this.props.gutter
  // }

  // widthDiff(dimensions) {
  //   const currentWidth = reduce(
  //     dimensions,
  //     (sum, img) => {
  //       return sum + img.width
  //     },
  //     0
  //   )
  //   return this.props.size.width - currentWidth - this.totalWhitespace()
  // }

  // getDimensions(containerWidth) {
  //   const artworks = this.props.artworks.edges

  //   // Get initial dimensions based on the targetHeight
  //   let dimensions = artworks.map(artwork => {
  //     return {
  //       __id: artwork.node.__id,
  //       width: this.props.targetHeight * artwork.node.image.aspect_ratio,
  //       height: this.props.targetHeight,
  //     }
  //   })

  //   // If the total width difference is less than 0, it is larger than the container
  //   // so we need to scale down. If not, scale up.
  //   let dir = this.widthDiff(dimensions) < 0 ? -1 : 1

  //   // Keep looping until we get an acceptable width difference
  //   while (true) {
  //     for (let img of dimensions) {
  //       resizeHeight(img, dir)
  //       if (this.widthDiff(dimensions) > 1) {
  //         break
  //       }
  //     }
  //     if (this.widthDiff(dimensions) > 1) {
  //       break
  //     }
  //   }

  //   // Round image dimensions to whole numbers
  //   for (let img of dimensions) {
  //     img.width = Math.floor(img.width)
  //     img.height = Math.floor(img.height)
  //     if (this.widthDiff(dimensions) === 0) {
  //       break
  //     }
  //   }

  //   // Voila, sizes for our images
  //   return dimensions
  // }

  renderArtwork(artwork, dimensions, i) {
    const { gutter } = this.props
    const artworkSize = find(dimensions, ["__id", artwork.__id])
    return (
      <Artwork
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
    const dimensions = getDimensions(
      this.props.artworks.edges,
      this.props.size.width,
      this.props.gutter,
      this.props.width,
      this.props.targetHeight
    )
    return (
      <div className={this.props.className}>
        {artworks.map((artwork, i) => this.renderArtwork(artwork.node, dimensions, i))}
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

const ArtworkFragment = Relay.QL`
  fragment on Artwork {
    __id
    image {
      aspect_ratio
    }
    ${Artwork.getFragment("artwork")}
  }
`
const sizeMeOptions = {
  monitorHeight: false,
  refreshRate: 64,
  refreshMode: "debounce",
}

const FillwidthDimensions = sizeMe(sizeMeOptions)(StyledFillwidth) as React.StatelessComponent<Props>

export default Relay.createContainer(FillwidthDimensions, {
  fragments: {
    artworks: () => Relay.QL`
      fragment on ArtworkConnection {
        edges {
          node {
            ${ArtworkFragment}
          }
        }
      }
    `,
  },
})
