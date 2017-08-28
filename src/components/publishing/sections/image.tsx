import React from "react"
import styled from "styled-components"
import Caption from "./caption"

const BlockImage = styled.img`
  display: block;
`

interface ImageProps extends React.HTMLProps<HTMLDivElement> {
  image?: any
  layout?: string
  width?: number | string
  height?: number | string
}

const Image: React.SFC<ImageProps> = props => {
  const { image, layout, width, height } = props
  return (
    <div className="article-image">
      <BlockImage src={image.url} width={width} height={height} alt={image.caption.replace(/<[^>]*>/g, "")} />
      <Caption caption={image.caption} layout={layout} viewFullscreen={layout !== "classic"} />
    </div>
  )
}

Image.defaultProps = {
  width: "100%",
  height: "auto",
}

export default Image
