import { Flex, Sans } from "@artsy/palette"
import { GridItem_artwork } from "__generated__/GridItem_artwork.graphql"
import { Mediator } from "Artsy/SystemContext"
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
  user?: User
  mediator?: Mediator
}

interface State {
  isMounted: boolean
}

const IMAGE_QUALITY = 80

const Badge = styled.div`
  border-radius: 2px;
  letter-spacing: 0.3px;
  padding: 3px 5px 1px 6px;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  margin-left: 5px;
`

const Badges = styled(Flex)`
  position: absolute;
  bottom: 8px;
  left: 3px;
  pointer-events: none;
`

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

  renderArtworkBadge({ is_biddable, is_acquireable, href }) {
    return (
      <React.Fragment>
        <Badges>
          {is_biddable && (
            <Badge>
              <Sans size="0">Bid</Sans>
            </Badge>
          )}
          {is_acquireable && (
            <Badge>
              <a
                href={href}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Sans size="0">Buy Now</Sans>
              </a>
            </Badge>
          )}
        </Badges>
      </React.Fragment>
    )
  }

  render() {
    const { style, className, artwork, useRelay, user } = this.props
    const SaveButtonBlock = useRelay ? RelaySaveButton : SaveButton
    const MetadataBlock = useRelay ? RelayMetadata : Metadata

    let userSpread = {}
    if (user) {
      userSpread = { user }
    }

    const enableBuyNowFlow = sd.ENABLE_NEW_BUY_NOW_FLOW
    return (
      <Responsive>
        {({ hover, ...breakpoints }) => {
          return (
            <div className={className} style={style}>
              <Placeholder style={{ paddingBottom: artwork.image.placeholder }}>
                <a href={artwork.href}>
                  <Image src={this.getImageUrl(breakpoints)} />
                </a>
                {enableBuyNowFlow && this.renderArtworkBadge(artwork)}
                {/* The undefined check is a fallback for Force code that uses
                    Reaction code without wrapping the tree in a Responsive
                    provider component. */}
                {(hover === undefined || hover) && (
                  <SaveButtonBlock
                    className="artwork-save"
                    artwork={artwork}
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                    }}
                    useRelay={useRelay}
                    {...userSpread}
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
      is_acquireable
      href
      ...Metadata_artwork
      ...Save_artwork
    }
  `
)
