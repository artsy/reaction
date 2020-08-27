import { pMedia } from "Components/Helpers"
import { ArticleLayout, SectionLayout } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { Text, color } from "@artsy/palette"

interface CaptionProps {
  caption: string
  color?: string
  index?: any
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
}

interface FigcaptionProps {
  color?: string
  layout: ArticleLayout
  sectionLayout?: SectionLayout
}

export const Caption: React.FC<CaptionProps> = props => {
  const { caption, children, color, layout, sectionLayout } = props

  const child = children || (
    <div dangerouslySetInnerHTML={{ __html: caption }} />
  )

  return (
    <CaptionContainer>
      <Figcaption layout={layout} sectionLayout={sectionLayout} color={color}>
        <Text
          color="black60"
          variant="caption"
          fontFamily={layout === "classic" ? "serif" : "sans"}
        >
          {child}
        </Text>
      </Figcaption>
    </CaptionContainer>
  )
}

export const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;

  ${pMedia.xs`
    padding: 0px 10px;
  `};
`

// includes draft placeholder class for editable text in Writer
const Figcaption = styled.div<FigcaptionProps>`
  padding: ${props => (props.sectionLayout === "fillwidth" ? "0 10px" : "0")};
  width: 100%;
  word-break: break-word;

  & > a,
  a {
    color: inherit;

    &:hover {
      color: ${color("black100")};
    }
  }

  ${pMedia.xs`
    padding: 0;
  `}
`
