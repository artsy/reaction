import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Layout } from "../Typings"
import ViewFullscreen, { ViewFullscreenLink } from "./ViewFullscreen"

interface ImageWrapperProps extends React.HTMLProps<HTMLImageElement> {
  src: string
  layout?: Layout
  width?: string | number
  height?: string | number
  alt?: string
  index?: number
  images?: [object]
  slideIndex?: number
}

const ImageWrapper: React.SFC<ImageWrapperProps> = props => {
  const { layout, index, ...blockImageProps }: any = props
  const fullscreen = <ViewFullscreen images={props.images} slideIndex={props.slideIndex} index={index} />
  const viewFullscreen = layout !== "classic" ? fullscreen : false

  return (
    <StyledImageWrapper>
      <BlockImage {...blockImageProps} />
      {viewFullscreen}
    </StyledImageWrapper>
  )
}

const StyledImageWrapper = styled.div`
  position: relative;
  &:hover {
    ${ViewFullscreenLink} {
      opacity: 0.6;
    }
  }
  ${pMedia.sm`
    ${ViewFullscreenLink} {
      opacity: 0.6;
    }
  `}
`

const BlockImage = styled.img`
  display: block;
`

export default ImageWrapper
