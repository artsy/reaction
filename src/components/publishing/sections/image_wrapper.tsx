import React from "react"
import styled from "styled-components"
import ViewFullscreen from "./view_fullscreen"

interface ImageWrapperProps extends React.HTMLProps<HTMLDivElement> {
  src: any
  layout?: string
  width?: string | number
  height?: string | number
  alt?: string
  index?: number
}

const ImageWrapper: React.SFC<ImageWrapperProps> = props => {
  const { layout, index } = props
  const viewFullscreen = layout !== "classic" ? <ViewFullscreen index={index} /> : false
  const newProps: any = { ...props }
  delete newProps.layout
  delete newProps.index

  return (
    <StyledImageWrapper>
      <BlockImage {...newProps} />
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
