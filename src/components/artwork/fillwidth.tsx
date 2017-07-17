import * as React from "react"
import * as Relay from "react-relay"

import sizeMe from "react-sizeme"
import styled from "styled-components"
import fillwidthDimensions from "../../utils/fillwidth"
import Artwork from "./fillwidth_item"

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
    const dimensions = fillwidthDimensions(
      this.props.artworks.edges,
      this.props.size.width,
      this.props.gutter,
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
