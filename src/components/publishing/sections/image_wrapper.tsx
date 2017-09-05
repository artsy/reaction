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
  const viewFullscreen = layout !== "classic" ? <ViewFullscreen index={index} /> : false

  return (
    <StyledImageWrapper>
      <BlockImage {...blockImageProps} />
      {viewFullscreen}
    </StyledImageWrapper>
  )
}

const StyledImageWrapper = styled.div`
  position: relative;
`

const BlockImage = styled.img`
  display: block;
`

export default ImageWrapper
