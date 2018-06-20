import { unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
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
    <Vertical color={color}>
      {prefix}
      {seriesArticle && hasSeries ? (
        <a href={seriesLink}>{seriesArticle.title}</a>
      ) : (
        <span>{vertical}</span>
      )}
    </Vertical>
  )
}

export const Vertical = styled.div`
  ${unica("s16", "medium")};
  color: ${props => props.color || "black"};
  a {
    color: ${props => props.color || "black"};
    text-decoration: none;
  }
  ${pMedia.sm`
    ${unica("s14", "medium")}
  `};
`
