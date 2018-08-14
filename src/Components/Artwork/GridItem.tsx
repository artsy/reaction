import { Sans } from "@artsy/palette"
import { GridItem_artwork } from "__generated__/GridItem_artwork.graphql"
import { pickBy } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Responsive } from "Utils/Responsive"
import colors from "../../Assets/Colors"
import RelayMetadata, { Metadata } from "./Metadata"
import RelaySaveButton, { SaveButton } from "./Save"

const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  background-color: ${colors.grayMedium};
  position: relative;
  width: 100%;
`

interface Props extends React.HTMLProps<ArtworkGridItemContainer> {
  useRelay?: boolean
  artwork: GridItem_artwork
  style?: any
  currentUser?: any
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

interface State {
  isMounted: boolean
}

const IMAGE_QUALITY = 80

class ArtworkGridItemContainer extends React.Component<Props, State> {
  static defaultProps = {
    useRelay: true,
  }

  state = {
    isMounted: false,
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
  }

  getImageUrl(breakpoints) {
    const imageURL = this.props.artwork.image.url

    if (!imageURL) {
      return null
    }

    if (this.state.isMounted) {
      const breakpoint = Object.keys(pickBy(breakpoints))[0]
      const getWidth = () => {
        switch (breakpoint) {
          case "xs":
          case "sm":
          case "md":
            return 400
          case "lg":
          case "xl":
          default:
            return 300
        }
      }

      const width = Math.floor(getWidth())
      const height = Math.floor(width / this.props.artwork.image.aspect_ratio)

      // Either scale or crop, based on if an aspect ratio is available.
      const type = this.props.artwork.image.aspect_ratio ? "fit" : "fill"
      // tslint:disable-next-line:max-line-length
      return `${
        sd.GEMINI_CLOUDFRONT_URL
      }/?resize_to=${type}&width=${width}&height=${height}&quality=${IMAGE_QUALITY}&src=${encodeURIComponent(
        imageURL
      )}`
    }
  }

  renderBidLabel() {
    return (
      <Sans
        size="1"
        style={{
          position: "absolute",
          bottom: "8px",
          left: "8px",
          borderRadius: "2px",
          letterSpacing: "0.3px",
          padding: "1px 5px 0px 6px",
          backgroundColor: "white",
          boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.1)",
          textTransform: "uppercase",
        }}
      >
        Bid
      </Sans>
    )
  }

  render() {
    const { style, className, artwork, useRelay, currentUser } = this.props
    const SaveButtonBlock = useRelay ? RelaySaveButton : SaveButton
    const MetadataBlock = useRelay ? RelayMetadata : Metadata

    let currentUserSpread = {}
    if (currentUser) {
      currentUserSpread = { currentUser }
    }

    const hasBuyNowLabFeature =
      currentUser &&
      currentUser.lab_features &&
      currentUser.lab_features.includes("New Buy Now Flow")
    return (
      <Responsive>
        {({ hover, ...breakpoints }) => {
          return (
            <div className={className} style={style}>
              <Placeholder style={{ paddingBottom: artwork.image.placeholder }}>
                <a href={artwork.href}>
                  <Image src={this.getImageUrl(breakpoints)} />
                </a>
                {hasBuyNowLabFeature &&
                  artwork.is_biddable &&
                  this.renderBidLabel()}
                {hover && (
                  <SaveButtonBlock
                    className="artwork-save"
                    artwork={artwork}
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                    }}
                    useRelay={useRelay}
                    {...currentUserSpread}
                    mediator={this.props.mediator}
                  />
                )}
              </Placeholder>
              <MetadataBlock artwork={artwork} useRelay={useRelay} />
            </div>
          )
        }}
      </Responsive>
    )
  }
}

export const ArtworkGridItem = styled(ArtworkGridItemContainer)`
  .artwork-save {
    opacity: 0;
  }

  &:hover .artwork-save {
    opacity: 1;
  }
`

export default createFragmentContainer(
  ArtworkGridItem,
  graphql`
    fragment GridItem_artwork on Artwork {
      image {
        placeholder
        url(version: "large")
        aspect_ratio
      }
      is_biddable
      href
      ...Metadata_artwork
      ...Save_artwork
    }
  `
)
