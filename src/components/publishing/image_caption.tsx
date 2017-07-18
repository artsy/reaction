import React from "react"
import styled, { StyledFunction } from "styled-components"
import Fonts from "./fonts"
import ViewFullscreen from "./view_fullscreen"

const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;
`

interface FigcaptionProps {
  layout: string
}
const div: StyledFunction<FigcaptionProps & React.HTMLProps<HTMLDivElement>> = styled.div
const Figcaption = div`
  & > p {
    ${props => (props.layout === "classic" ? Fonts.garamond("s15") : Fonts.unica("s14", "medium"))}
    color: ${props => (props.layout === "classic" ? "#666" : "#999")};
    margin: 0;
  }
`

interface CaptionProps {
  image: any
  layout?: string
}
const Caption: React.SFC<CaptionProps> = props => {
  const { layout, image } = props
  const viewFullscreen = layout !== "classic" ? <ViewFullscreen /> : false

  return (
    <CaptionContainer>
      <Figcaption dangerouslySetInnerHTML={{ __html: image.caption }} layout={layout} />
      {viewFullscreen}
    </CaptionContainer>
  )
}

export default Caption
