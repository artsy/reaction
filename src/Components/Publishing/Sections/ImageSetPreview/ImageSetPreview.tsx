import { color, Flex } from "@artsy/palette"
import React, { ReactNode } from "react"
import styled from "styled-components"

import { withFullScreen } from "Components/Publishing/Sections/FullscreenViewer/withFullScreen"
import { resize } from "Utils/resizer"
import { ImageSetLabel } from "./ImageSetLabel"

type Layout = "mini" | "full"

export interface ImageSetPreviewProps {
  section: {
    type: string
    images: Array<{
      url?: string
      image?: string
      index?: any
    }>
    layout?: Layout
    title?: string
  }
  children?: ReactNode
  onViewFullscreen?: (index: number) => void
}

@withFullScreen
export class ImageSetPreview extends React.PureComponent<
  ImageSetPreviewProps,
  null
> {
  getImageUrl() {
    const { images, layout } = this.props.section
    const image = images[0]
    const src = image.url ? image.url : image.image
    const width = layout === "full" ? 800 : 200

    return resize(src, { width })
  }

  onClick = () => {
    this.props.onViewFullscreen(this.props.section.images[0].index)
  }

  render() {
    const {
      children,
      section: { layout, title },
    } = this.props
    const alt = title || "Open Slideshow"
    const src = this.getImageUrl()

    if (layout === "full") {
      return (
        <ImageSetContainer>
          <FullLabel onClick={this.onClick}>
            <ImageSetLabel {...this.props} />
            {children}
          </FullLabel>
          <ImgContainer>
            <Img src={src} alt={alt} />
          </ImgContainer>
        </ImageSetContainer>
      )
    } else {
      return (
        <ImageSetContainer>
          <MiniWrapper alignItems="center" onClick={this.onClick}>
            <Img src={src} alt={alt} />
            <ImageSetLabel {...this.props} />
          </MiniWrapper>
        </ImageSetContainer>
      )
    }
  }
}

export const ImageSetContainer = styled.div`
  position: relative;
  width: 100%;
`

export const FullLabel = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  min-height: 50px;
  width: auto;
  max-width: calc(100% - 80px);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;
    path,
    polygon {
      fill: white;
    }
  }
`

export const Img = styled.img`
  height: auto;
  width: 100%;
`

export const ImgContainer = styled.div``

const MiniWrapper = styled(Flex)`
  height: 100px;
  padding: 10px 0 10px 10px;
  border: 1px solid ${color("black10")};
  cursor: pointer;

  ${Img} {
    height: 100%;
    width: auto;
  }
`
