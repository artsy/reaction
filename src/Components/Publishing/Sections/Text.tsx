import React from "react"
import { ArticleLayout } from "../Typings"
import { StyledText } from "./StyledText"

interface TextProps extends React.HTMLProps<HTMLDivElement> {
  color?: string
  html?: string
  isContentEnd?: boolean
  isContentStart?: boolean
  layout: ArticleLayout
  postscript?: boolean
}

export const Text: React.SFC<TextProps> = props => {
  const {
    color,
    html,
    isContentEnd,
    isContentStart,
    layout,
    postscript,
  } = props
  const child = html ? (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    props.children
  )
  return (
    <StyledText
      className="article__text-section"
      color={color}
      isContentEnd={isContentEnd}
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
