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

const htmlMaybeWithContentEnd = (html, isContentEnd) => {
  const doc = document.createElement("div")
  doc.innerHTML = html
  // remove existing content-end spans, remove after backfill
  const existingSpans = doc.getElementsByClassName("content-end")
  if (existingSpans.length) {
    existingSpans[0].outerHTML = ""
  }
  if (isContentEnd) {
    const allParagraphs = doc.getElementsByTagName("P")
    const lastParagraph =
      allParagraphs.length && allParagraphs[allParagraphs.length - 1]
    lastParagraph.innerHTML =
      lastParagraph.innerHTML + "<span class='content-end'> </span>"
  }
  return doc.innerHTML
}
