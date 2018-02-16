import React from "react"
import { Layout } from "../Typings"
import { StyledText } from "./StyledText"

interface TextProps extends React.HTMLProps<HTMLDivElement> {
  color?: string
  html?: string
  isContentStart?: boolean
  layout: Layout
  postscript?: boolean
}

export const Text: React.SFC<TextProps> = props => {
  const { color, html, isContentStart, layout, postscript } = props
  const child = html ? (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    props.children
  )
  return (
    <StyledText
      className="article__text-section"
      color={color}
      isContentStart={isContentStart}
      layout={layout}
      postscript={postscript}
    >
      {child}
    </StyledText>
  )
}

Text.defaultProps = {
  color: "black",
}
