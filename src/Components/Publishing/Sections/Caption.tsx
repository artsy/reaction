import { garamond, unica } from "Assets/Fonts"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { ArticleLayout, SectionLayout } from "../Typings"

interface CaptionProps {
  caption: string
  index?: any
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
}

interface FigcaptionProps {
  layout: ArticleLayout
  sectionLayout?: SectionLayout
}

export const Caption: React.SFC<CaptionProps> = props => {
  const { caption, children, layout, sectionLayout } = props

  const child = children || (
    <div dangerouslySetInnerHTML={{ __html: caption }} />
  )

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
  `};
`
const div: StyledFunction<FigcaptionProps & React.HTMLProps<HTMLDivElement>> =
  styled.div

// includes draft placeholder class for editable text in Writer
const Figcaption = div`
  padding: ${props => (props.sectionLayout === "fillwidth" ? "0 10px;" : "0;")}
  width: 100%;
  word-break: break-word;

  & > p, p,
  .public-DraftEditorPlaceholder-root,
  .public-DraftStyleDefault-block {
    ${props => (props.layout === "classic" ? garamond("s15") : unica("s14"))}
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
