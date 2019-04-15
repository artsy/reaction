import { color, Image as BaseImage } from "@artsy/palette"
import { GridItem_artwork } from "__generated__/GridItem_artwork.graphql"
import { Mediator } from "Artsy/SystemContext"
import { isFunction } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import Badge from "./Badge"
import Metadata from "./Metadata"
import SaveButton from "./Save"

let IMAGE_LAZY_LOADING = true

const Placeholder = styled.div`
  background-color: ${color("black10")};
  position: relative;
  width: 100%;
  overflow: hidden;
`

const Image = styled(BaseImage)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

interface Props extends React.HTMLProps<ArtworkGridItemContainer> {
  artwork: GridItem_artwork
  lazyLoad?: boolean
  mediator?: Mediator
  onClick?: () => void
  style?: any
  user?: User
}

interface State {
  isMounted: boolean
}

const IMAGE_QUALITY = 80

class ArtworkGridItemContainer extends React.Component<Props, State> {
  state = {
    isMounted: false,
  }

  canHover: boolean

  componentDidMount() {
    this.setState({
      isMounted: true,
    })

    // Satisfy test runner. See https://github.com/artsy/reaction/blob/master/src/setup_jest.ts#L28
    if (isFunction(window.matchMedia)) {
      this.canHover = !window.matchMedia("(hover: none)").matches
    }
    IMAGE_LAZY_LOADING =
      sd.IMAGE_LAZY_LOADING || process.env.IMAGE_LAZY_LOADING === "true"
  }

  getImageUrl() {
    const imageURL = this.props.artwork.image.url
    if (!imageURL) {
      return null
    }

    const width = 400
    const height = Math.floor(width / this.props.artwork.image.aspect_ratio)
    const type = this.props.artwork.image.aspect_ratio ? "fit" : "fill" // Either scale or crop, based on if an aspect ratio is available.
    const geminiUrl =
      sd.GEMINI_CLOUDFRONT_URL || process.env.GEMINI_CLOUDFRONT_URL // fallback, useful if we're yarn linking

    const url = `${geminiUrl}/?resize_to=${type}&width=${width}&height=${height}&quality=${IMAGE_QUALITY}&src=${encodeURIComponent(imageURL)}` // prettier-ignore
    return url
  }

  get shouldTrackArtworkImpressions() {
    let track = false
    if (this.state.isMounted) {
      track = window.location.pathname.includes("/collect")
    }
    return track
  }

  render() {
    const { style, className, artwork, user, lazyLoad = true } = this.props

    let userSpread = {}
    if (user) {
      userSpread = { user }
    }

    // the 'artwork-item' className and data-id={artwork._id} are required to
    // track Artwork impressions
    const trackableClassName = this.shouldTrackArtworkImpressions
      ? "artwork-item"
      : ""

    return (
      <div
        className={`${className} ${trackableClassName}`}
        data-id={artwork._id}
        style={style}
      >
        <Placeholder style={{ paddingBottom: artwork.image.placeholder }}>
          <a
            href={artwork.href}
            onClick={() => {
              if (this.props.onClick) {
                this.props.onClick()
              }
            }}
          >
            <Image
              title={artwork.title}
              alt={artwork.image_title}
              src={this.getImageUrl()}
              lazyLoad={IMAGE_LAZY_LOADING && lazyLoad}
            />
          </a>

          <Badge artwork={artwork} />

          {this.canHover && (
            <SaveButton
              className="artwork-save"
              artwork={artwork}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
              {...userSpread}
              mediator={this.props.mediator}
            />
          )}
        </Placeholder>

        <Metadata artwork={artwork} />
      </div>
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

export default createFragmentContainer(ArtworkGridItem, {
  artwork: graphql`
    fragment GridItem_artwork on Artwork {
      _id
      title
      image_title
      image {
        placeholder
        url(version: "large")
        aspect_ratio
      }
      href
      ...Metadata_artwork
      ...Save_artwork
      ...Badge_artwork
    }
  `,
})
