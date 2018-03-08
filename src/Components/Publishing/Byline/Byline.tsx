import React from "react"
import styled, { StyledFunction } from "styled-components"
import { getArticleFullHref } from "../Constants"
import { ArticleData, BylineLayout } from "../Typings"
import { Author, Date } from "./AuthorDate"
import { Share } from "./Share"

interface BylineProps {
  article: ArticleData
  date?: string
  layout?: BylineLayout
  color?: string
}

interface BylineContainerProps {
  color: string
}

export const Byline: React.SFC<BylineProps> = props => {
  const { article, color, date, layout } = props
  const { contributing_authors, published_at } = article
  const title = article.social_title || article.thumbnail_title
  const url = getArticleFullHref(article.slug)
  const textColor = layout === "fullscreen" ? "white" : color

  // TODO: Replace `authors` with `contributing_authors` when ready. Also in
  // <BasicHeader />
  return (
    <BylineContainer className="Byline" color={textColor}>
      <Author
        authors={contributing_authors}
        color={textColor}
        layout={layout}
        articleLayout={article.layout}
      />

      <Date date={date || published_at} layout={layout} />

      {layout !== "condensed" && (
        <Share url={url} title={title} color={textColor} />
      )}
    </BylineContainer>
  )
}

Byline.defaultProps = {
  color: "black",
}

const Div: StyledFunction<
  BylineContainerProps & React.HTMLProps<HTMLDivElement>
> =
  styled.div

const BylineContainer = Div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  align-items: flex-end;
  color: ${props => props.color};
`
