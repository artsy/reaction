import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Relay from "react-relay"

import styled from "styled-components"
import Artwork from "./Artwork/GridItem"

interface Props extends RelayProps, React.HTMLProps<ArtworkGrid> {
  columnCount?: number
  sectionMargin?: number
  itemMargin?: number
  onLoadMore?: () => any
}

interface State {
  loading: boolean
  interval: any
}

export class ArtworkGrid extends React.Component<Props, State> {
  public static defaultProps: Partial<Props>

  state = {
    interval: null,
    loading: false,
  }

  componentDidMount() {
    if (this.props.onLoadMore) {
      const interval = setInterval(() => {
        this.maybeLoadMore()
      }, 150)
      this.setState({ interval })
    }
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
  }

  maybeLoadMore() {
    const threshold = window.innerHeight + window.scrollY
    const el = ReactDOM.findDOMNode(this)
    if (threshold >= el.clientHeight + el.scrollTop) {
      this.props.onLoadMore()
    }
  }

  sectionedArtworks() {
    const sectionedArtworks: ArtworkRelayProps[][] = []
    const sectionRatioSums = []
    const artworks = this.props.artworks ? this.props.artworks.edges : []

    for (let i = 0; i < this.props.columnCount; i++) {
      sectionedArtworks.push([])
      sectionRatioSums.push(0)
    }

    artworks.forEach(artworkEdge => {
      const artwork = artworkEdge.node

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
          sectionRatioSums[sectionIndex] += 1 / aspectRatio
        }
      }
    })

    return sectionedArtworks
  }

  renderSections() {
    const spacerStyle = {
      height: this.props.itemMargin,
    }
    const sectionedArtworks = this.sectionedArtworks()
    const sections = []

    for (let i = 0; i < this.props.columnCount; i++) {
      const artworkComponents = []
      for (let j = 0; j < sectionedArtworks[i].length; j++) {
        const artwork = sectionedArtworks[i][j]
        artworkComponents.push(<Artwork artwork={artwork as any} key={"artwork-" + j + "-" + artwork.__id} />)
        // Setting a marginBottom on the artwork component didn’t work, so using a spacer view instead.
        if (j < sectionedArtworks[i].length - 1) {
          artworkComponents.push(<div style={spacerStyle} key={"spacer-" + j + "-" + artwork.__id} />)
        }
      }

      const sectionSpecificStyle = {
        flex: 1,
        minWidth: 0,
        marginRight: i === this.props.columnCount - 1 ? 0 : this.props.sectionMargin,
      }

      sections.push(<div style={sectionSpecificStyle} key={i}>{artworkComponents}</div>)
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
  itemMargin: 20,
}

const StyledGrid = styled(ArtworkGrid)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const ArtworkFragment = Relay.QL`
  fragment on Artwork {
    __id
    image {
      aspect_ratio
    }
    ${Artwork.getFragment("artwork")}
  }
`

export default Relay.createContainer(StyledGrid, {
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

interface ArtworkRelayProps {
  __id: string
  image: {
    aspect_ratio: number | null
  } | null
}

interface RelayProps {
  artworks: {
    edges: Array<{
      node: any
    } | null> | null
  }
}
