import React from "react"
import styled from "styled-components"
import Fonts from "./fonts"

const CaptionLink = styled.div`
  ${Fonts.unica("s14", "medium")}
  margin: 0;
  margin-left: 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
  display: inline-block;
  min-width: 7.1em;
  align-self: flex-start;
`

const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;
`

// Caption
interface FigcaptionProps extends React.HTMLProps<HTMLDivElement> {
  layout: string
}
const Figcaption = styled.div`
  & > p {
    ${(props: FigcaptionProps) => (props.layout === "classic" ? Fonts.garamond("s15") : Fonts.unica("s14", "medium"))}
    color: ${(props: FigcaptionProps) => (props.layout === "classic" ? "#666" : "#999")};
    margin: 0;
  }
`
interface CaptionProps {
  image: any
  layout?: string
}

const Caption: React.SFC<CaptionProps> = props => {
  const { layout, image } = props
  const viewFullscreen = layout !== "classic" ? <CaptionLink>View Fullscreen</CaptionLink> : false

  return (
    <CaptionContainer>
      <Figcaption dangerouslySetInnerHTML={{ __html: image.caption }} layout={layout} />
      {viewFullscreen}
    </CaptionContainer>
  )
}

export default Caption
