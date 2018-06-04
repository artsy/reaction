import React from "react"
// @ts-ignore
import { ComponentRef, createFragmentContainer, graphql } from "react-relay"
// @ts-ignore
import styled, { StyledComponentClass } from "styled-components"

import RelayMetadata, { Metadata } from "./Metadata"
import RelaySaveButton, { SaveButton } from "./Save"

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
  extends RelayProps,
    React.HTMLProps<FillwidthItemContainer> {
  targetHeight?: number
  imageHeight?: number
  width?: number
  margin?: number
  useRelay?: boolean
}

export class FillwidthItemContainer extends React.Component<
  FillwidthItemContainerProps,
  null
> {
  static defaultProps = {
    useRelay: true,
  }

  render() {
    const {
      artwork,
      className,
      targetHeight,
      imageHeight,
      useRelay,
    } = this.props

    const SaveButtonBlock = useRelay ? RelaySaveButton : SaveButton
    const MetadataBlock = useRelay ? RelayMetadata : Metadata

    return (
      <div className={className}>
        <Placeholder style={{ height: targetHeight }}>
          <ImageLink href={artwork.href}>
            <Image src={artwork.image.url} height={imageHeight} />
          </ImageLink>
          <SaveButtonBlock
            className="artwork-save"
            artwork={artwork as any}
            style={{ position: "absolute", right: "5px", bottom: "5px" }}
            useRelay={useRelay}
          />
        </Placeholder>
        <MetadataBlock artwork={artwork} useRelay={useRelay} extended />
      </div>
    )
  }
}

export const FillwidthItem = styled(FillwidthItemContainer)`
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

export interface RelayProps {
  artwork: {
    href: string | null
    image: {
      placeholder: number | null
      url: string | null
      aspect_ratio: number | null
    } | null
  }
}
