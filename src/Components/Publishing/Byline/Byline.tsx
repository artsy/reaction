import React from "react"
import styled from "styled-components"
import { getArticleFullHref } from "../Constants"
import { ArticleData, BylineLayout } from "../Typings"
import { Author } from "./Author"
import { Date } from "./Date"
import { Share } from "./Share"

interface BylineProps {
  article: ArticleData
  color?: string
  date?: string
  layout?: BylineLayout
  size?:
    | "1"
    | "2"
    | "3"
    | "3t"
    | "4"
    | "4t"
    | "5"
    | "5t"
    | "6"
    | "8"
    | "10"
    | "12"
    | "14"
    | "16"
}
// TODO: replace size with interface from palette

export const Byline: React.SFC<BylineProps> = props => {
  const {
    article: { authors, published_at, slug, social_title, thumbnail_title },
    color,
    date,
    layout,
    size,
  } = props
  const textColor = layout === "fullscreen" ? "white" : color

  return (
    <BylineContainer className="Byline" color={textColor}>
      <Author authors={authors} color={textColor} layout={layout} size={size} />

      <Date date={date || published_at} layout={layout} size={size} />

      {layout !== "condensed" && (
        <Share
          url={getArticleFullHref(slug)}
          title={social_title || thumbnail_title}
          color={textColor}
        />
      )}
    </BylineContainer>
  )
}

Byline.defaultProps = {
  color: "black",
}

export const BylineContainer = styled.div.attrs<{ color: string }>({})`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  color: ${props => props.color};
`
