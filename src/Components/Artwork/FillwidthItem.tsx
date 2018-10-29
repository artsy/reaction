import { FillwidthItem_artwork } from "__generated__/FillwidthItem_artwork.graphql"
import { ContextProps } from "Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import RelayMetadata, { Metadata } from "./Metadata"
import RelaySaveButton, { SaveButton } from "./Save"

// @ts-ignore
import { Mediator } from "Artsy/SystemContext"

// @ts-ignore
import styled, { StyledComponentClass } from "styled-components"

const IMAGE_QUALITY = 80
const FALLBACK_RATIO = 1

const Image = styled.img`
  width: 100%;
`

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
  extends ContextProps,
    React.HTMLProps<FillwidthItemContainer> {
  targetHeight?: number
  imageHeight?: number
  width?: number
  margin?: number
  useRelay?: boolean
  artwork: FillwidthItem_artwork
  mediator?: Mediator
}

export class FillwidthItemContainer extends React.Component<
  FillwidthItemContainerProps
> {
  static defaultProps = {
    useRelay: true,
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
    // In case aspect ratio is not available we still want to try to get some width
    const ratio = aspect_ratio || FALLBACK_RATIO
    const height = this.props.imageHeight * window.devicePixelRatio
    const width = Math.floor(height * ratio * window.devicePixelRatio)

    // tslint:disable-next-line:max-line-length
    return `${
      sd.GEMINI_CLOUDFRONT_URL
    }/?resize_to=${type}&width=${width}&height=${height}&quality=${IMAGE_QUALITY}&src=${encodeURIComponent(
      imageURL
    )}`
  }

  render() {
    const {
      artwork,
      className,
      targetHeight,
      imageHeight,
      useRelay,
      user,
      mediator,
    } = this.props

    let userSpread = {}
    if (user) {
      userSpread = { user }
    }
    const SaveButtonBlock = useRelay ? RelaySaveButton : SaveButton
    const MetadataBlock = useRelay ? RelayMetadata : Metadata

    return (
      <div className={className}>
        <Placeholder style={{ height: targetHeight }}>
          <ImageLink href={artwork.href}>
            <Image src={this.getImageUrl()} height={imageHeight} />
          </ImageLink>
          <SaveButtonBlock
            {...userSpread}
            mediator={mediator}
            className="artwork-save"
            artwork={artwork}
            style={{ position: "absolute", right: "5px", bottom: "5px" }}
            useRelay={useRelay}
          />
        </Placeholder>
        <MetadataBlock artwork={artwork} useRelay={useRelay} extended />
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

export default createFragmentContainer(
  FillwidthItem,
  graphql`
    fragment FillwidthItem_artwork on Artwork {
      image {
        placeholder
        url(version: "large")
        aspect_ratio
      }
      href
      ...Metadata_artwork
      ...Save_artwork
    }
  `
)
