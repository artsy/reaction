import { Image } from "@artsy/palette"
import { FillwidthItem_artwork } from "__generated__/FillwidthItem_artwork.graphql"
import { SystemContextProps } from "Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import Badge from "./Badge"
import Metadata from "./Metadata"
import SaveButton from "./Save"

// @ts-ignore
import { Mediator } from "Artsy"

// @ts-ignore
import styled, { StyledComponentClass } from "styled-components"
import { get } from "Utils/get"
import createLogger from "Utils/logger"

const logger = createLogger("FillwidthItem.tsx")

const IMAGE_QUALITY = 80

const ImageLink = styled.a`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  position: relative;
  width: 100%;
`

export interface FillwidthItemContainerProps
  extends SystemContextProps,
    React.HTMLProps<FillwidthItemContainer> {
  artwork: FillwidthItem_artwork
  imageHeight?: number
  margin?: number
  mediator?: Mediator
  onClick?: () => void
  targetHeight?: number
  width?: number
  lazyLoad?: boolean
}

export class FillwidthItemContainer extends React.Component<
  FillwidthItemContainerProps
> {
  get imageWidth() {
    const {
      artwork: {
        image: { aspect_ratio },
      },
    } = this.props

    return Math.floor(this.imageHeight * aspect_ratio)
  }

  get imageHeight() {
    return this.props.imageHeight * window.devicePixelRatio
  }

  getImageUrl() {
    const imageURL = this.props.artwork.image.url

    if (!imageURL) {
      return null
    }

    const {
      artwork: {
        image: { aspect_ratio },
      },
    } = this.props

    // Either scale or crop, based on if an aspect ratio is available.
    const type = aspect_ratio ? "fit" : "fill"

    // tslint:disable-next-line:max-line-length
    return `${sd.GEMINI_CLOUDFRONT_URL}/?resize_to=${type}&width=${
      this.imageWidth
    }&height=${
      this.imageHeight
    }&quality=${IMAGE_QUALITY}&src=${encodeURIComponent(imageURL)}`
  }

  render() {
    const {
      artwork,
      className,
      targetHeight,
      imageHeight,
      user,
      mediator,
      lazyLoad,
    } = this.props

    let userSpread = {}
    if (user) {
      userSpread = { user }
    }

    const image = get(this.props, p => p.artwork.image)
    if (!image) {
      const href = get(this.props, p => p.artwork.href, "(unknown href)")
      logger.error(`Artwork at ${href} does not have an image!`)
      return null
    }

    return (
      <div className={className}>
        <Placeholder style={{ height: targetHeight }}>
          <ImageLink
            href={artwork.href}
            onClick={() => {
              if (this.props.onClick) {
                this.props.onClick()
              }
            }}
          >
            <Image
              src={this.getImageUrl()}
              width="100%"
              height={imageHeight}
              lazyLoad={lazyLoad}
            />
          </ImageLink>

          <Badge artwork={artwork} width={this.imageWidth} />

          <SaveButton
            {...userSpread}
            mediator={mediator}
            className="artwork-save"
            artwork={artwork}
            style={{ position: "absolute", right: "5px", bottom: "5px" }}
          />
        </Placeholder>
        <Metadata artwork={artwork} extended />
      </div>
    )
  }
}

export const FillwidthItem = styled(FillwidthItemContainer).attrs<
  FillwidthItemContainerProps
>({})`
  display: inline-block;
  width: ${props => props.width}px;
  vertical-align: top;
  margin-right: ${props => props.margin}px;

  .artwork-save {
    opacity: 0;
  }

  &:hover .artwork-save {
    opacity: 1;
  }
`

export default createFragmentContainer(FillwidthItem, {
  artwork: graphql`
    fragment FillwidthItem_artwork on Artwork {
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
