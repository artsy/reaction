import React from "react"
import { Layout } from "../Typings"
import { StyledText } from "./StyledText"

interface TextProps extends React.HTMLProps<HTMLDivElement> {
  html?: string
  isContentStart?: boolean
  layout: Layout
  postscript?: boolean
}

export const Text: React.SFC<TextProps> = props => {
  const { html, isContentStart, layout, postscript } = props
  const child = html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : props.children
  return (
    <StyledText
      className="article__text-section"
      isContentStart={isContentStart}
      layout={layout}
      postscript={postscript}
    >
      {child}
    </StyledText>
  )
}
