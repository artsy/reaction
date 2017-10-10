import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import { Layout, SectionLayout } from "../typings"

interface CaptionProps {
  caption: string
  index?: any
  layout?: Layout
  sectionLayout?: SectionLayout
}
interface FigcaptionProps {
  layout: Layout
  sectionLayout?: SectionLayout
}

const Caption: React.SFC<CaptionProps> = props => {
  const { layout, caption, sectionLayout, children } = props
  const child = children ? children : <div dangerouslySetInnerHTML={{ __html: caption }} />
  return (
    <CaptionContainer>
      <Figcaption layout={layout} sectionLayout={sectionLayout}>
        {child}
      </Figcaption>
    </CaptionContainer>
  )
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
  padding: ${props => (props.sectionLayout === "fillwidth" ? "0 10px;" : "0;")}
  width: 100%;
  word-break: break-word;
  & > p, p, .public-DraftEditorPlaceholder-root {
    ${props => (props.layout === "classic" ? Fonts.garamond("s15") : Fonts.unica("s14"))}
    color: ${props => (props.layout === "classic" ? "#666" : "#999")};
    margin: 0;
  }
  & > a, a {
    color: #999;
    &:hover {
      color: black;
    }
  }
  ${pMedia.xs`
    padding: 0px;
  `}
`

export default Caption
