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
  // Remove existing spans - TODO: Backfill out of articles
  const cleanedHtml = html.replace("<span class='content-end'> </span>", "")

  if (isContentEnd) {
    const doc = document.createElement("div")
    doc.innerHTML = html
    const allParagraphs = doc.getElementsByTagName("P")
    // insert content-end in last paragraph
    const lastParagraph =
      allParagraphs.length && allParagraphs[allParagraphs.length - 1]
    lastParagraph.innerHTML =
      lastParagraph.innerHTML + "<span class='content-end'> </span>"

    return doc.innerHTML
  }
  return cleanedHtml
}
