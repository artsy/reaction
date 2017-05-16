import * as React from "react"
import * as Relay from "react-relay"

import Measure from "react-measure"
import styled from "styled-components"
import Artwork from "./fillwidth_item"

interface Props extends RelayProps, React.HTMLAttributes<Fillwidth> {
  targetHeight?: number
}

interface State {
  loading: boolean,
  dimensions: {
    width: number,
    height: number,
  }
}

export class Fillwidth extends React.Component<Props, State> {
  public static defaultProps: Partial<Props>

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dimensions: {
        width: -1,
        height: -1,
      },
    }
  }

  renderArtwork(artwork) {
    return (
      <Artwork
        artwork={artwork as any}
        key={"artwork--" + artwork.__id}
        targetHeight={this.props.targetHeight}
        width={100}
      />
    )
  }

  render() {
    const artworks = this.props.artworks.edges
    console.log('Measure', Measure)
    return (
      <Measure
        onMeasure={dimensions => this.setState({dimensions})}
      >
        <div ref="artworks" className={this.props.className}>
          {artworks.map(artwork => this.renderArtwork(artwork.node))}
        </div>
      </Measure>
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

export default Relay.createContainer(StyledFillwidth, {
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

