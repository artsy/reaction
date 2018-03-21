import React from "react"
import { strLeftBack, strRightBack } from "underscore.string"
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
  const formattedHtml = htmlMaybeWithContentEnd(html, isContentEnd)

  const child = html ? (
    <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
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

const htmlMaybeWithContentEnd = (html = "", isContentEnd) => {
  const cleanedHtml = html.replace("<span class='content-end'> </span>", "")

  if (isContentEnd) {
    const stringBefore = strLeftBack(cleanedHtml, "</p>")
    const stringAfter = strRightBack(cleanedHtml, "</p>")
    const htmlWithContentEnd = `
      ${stringBefore}<span class='content-end'> </span></p>${stringAfter}
    `
    return htmlWithContentEnd
  }
  return cleanedHtml
}
