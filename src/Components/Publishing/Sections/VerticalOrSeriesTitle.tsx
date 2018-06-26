import { Sans } from "@artsy/palette"
import React from "react"
import { getEditorialHref } from "../Constants"
import { ArticleData } from "../Typings"

interface Props {
  article?: ArticleData
  color?: string
  prefix?: string
  vertical?: any
}

export const VerticalOrSeriesTitle: React.SFC<Props> = props => {
  const { article, color, prefix } = props
  const { layout, hero_section, seriesArticle } = article
  const vertical = props.vertical
    ? props.vertical
    : article.vertical && article.vertical.name
  const hasSeries =
    (layout === "feature" &&
      hero_section &&
      hero_section.type === "fullscreen") ||
    layout === "video"

  const seriesLink =
    seriesArticle && getEditorialHref("series", seriesArticle.slug)

  return (
    <Vertical size="3t" weight="medium" color={color}>
      {prefix}
      {seriesArticle && hasSeries ? (
        <a href={seriesLink}>{seriesArticle.title}</a>
      ) : (
        <span>{vertical}</span>
      )}
    </Vertical>
  )
}

export const Vertical = Sans.extend`
  a {
    color: ${props => props.color || "black"};
    text-decoration: none;
  }
`
