import React from "react"
import styled from "styled-components"
import { Layout } from "../typings"
import ViewFullscreen from "./view_fullscreen"

interface ImageWrapperProps extends React.HTMLProps<HTMLImageElement> {
  src: string
  layout?: Layout
  width?: string | number
  height?: string | number
  alt?: string
  index?: number
}

const ImageWrapper: React.SFC<ImageWrapperProps> = props => {
  const { layout, index, ...blockImageProps }: any = props
  const fullscreen = <Fullscreen><ViewFullscreen index={index} /></Fullscreen>
  const viewFullscreen = layout !== "classic" ? fullscreen : false

  return (
    <StyledImageWrapper>
      <BlockImage {...blockImageProps} />
      {viewFullscreen}
    </StyledImageWrapper>
  )
}

const Fullscreen = styled.div`
  opacity: 0;
  transition: opacity .3s;
`

const StyledImageWrapper = styled.div`
  position: relative;
  &:hover {
    ${Fullscreen} {
      opacity: 1;
    }
  }
`

const BlockImage = styled.img`
  display: block;
`

export default ImageWrapper
