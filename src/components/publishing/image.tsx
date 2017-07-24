import React from "react"
import styled from "styled-components"
import Caption from "./caption"

const BlockImage = styled.img`
  display: block;
`

interface ImageProps extends React.HTMLProps<HTMLDivElement> {
  image?: any
  layout?: string
}

const Image: React.SFC<ImageProps> = props => {
  const { image, layout } = props
  return (
    <div className="article-image">
      <BlockImage src={image.url} width="100%" />
      <Caption caption={image.caption} layout={layout} />
    </div>
  )
}

export default Image
