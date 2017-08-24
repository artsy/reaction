import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import ViewFullscreen from "./view_fullscreen"

interface CaptionProps {
  caption: string
  layout?: string
  viewFullscreen?: boolean
}
interface FigcaptionProps {
  layout: string
}

const Caption: React.SFC<CaptionProps> = props => {
  const { layout, caption, viewFullscreen, children } = props
  const child = children ? children : <div dangerouslySetInnerHTML={{ __html: caption }} />
  return (
    <CaptionContainer>
      <Figcaption layout={layout}>
        {child}
      </Figcaption>
      {viewFullscreen ? <ViewFullscreen /> : false}
    </CaptionContainer>
  )
}
Caption.defaultProps = {
  viewFullscreen: true,
}

const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;
  ${pMedia.xs`
    padding: 0px 10px;
  `}
`
const div: StyledFunction<FigcaptionProps & React.HTMLProps<HTMLDivElement>> = styled.div
// includes draft placeholder class for editable text in Writer
const Figcaption = div`
  & > p, p, .public-DraftEditorPlaceholder-root {
    ${props => (props.layout === "classic" ? Fonts.garamond("s15") : Fonts.unica("s14", "medium"))}
    color: ${props => (props.layout === "classic" ? "#666" : "#999")};
    margin: 0;
  }
`

export default Caption
