import * as React from "react"
import * as Relay from "react-relay"

import * as Dimensions from "react-dimensions"
import styled from "styled-components"
import Artwork from "./fillwidth_item"

import { find } from "lodash"

interface Props extends RelayProps, React.HTMLAttributes<Fillwidth> {
  targetHeight?: number,
  containerWidth?: number,
}

interface State {
  loading: boolean,
  dimensions?: any
}

export class Fillwidth extends React.Component<Props, State> {
  public static defaultProps: Partial<Props>

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  renderArtwork(artwork, dimensions) {
    const artworkSize = find(dimensions, ["__id", artwork.__id])
    return (
      <Artwork
        artwork={artwork as any}
        key={"artwork--" + artwork.__id}
        targetHeight={this.props.targetHeight}
        imageHeight={artworkSize.height}
        width={artworkSize.width}
        margin={10}
      />
    )
  }

  getDimensions(containerWidth) {
    const artworks = this.props.artworks.edges
    const dimensions = artworks.map(artwork => {
      return {
        __id: artwork.node.__id,
        width: this.props.targetHeight * artwork.node.image.aspect_ratio,
        height: this.props.targetHeight,
      }
    })
    return dimensions
  }

  render() {
    const artworks = this.props.artworks.edges
    const dimensions = this.getDimensions(this.props.containerWidth)
    return (
      <div className={this.props.className}>
        {artworks.map(artwork => this.renderArtwork(artwork.node, dimensions))}
      </div>
    )
  }
}

const StyledFillwidth = styled(Fillwidth)`
  height: ${props => props.targetHeight + 100}px;
`

StyledFillwidth.defaultProps = {
  targetHeight: 180,
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

interface RelayProps {
  artworks: {
    edges: Array<{
      node: any,
    } | null> | null,
  },
}

const FillwidthDimensions = Dimensions()(StyledFillwidth)

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
