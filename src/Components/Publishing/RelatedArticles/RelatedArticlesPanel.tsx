import * as _ from "lodash"
import React from "react"
import styled from "styled-components"
import { crop } from "../../../Utils/resizer"
import Fonts from "../Fonts"

interface RelatedArticlesPanelProps extends React.HTMLProps<HTMLDivElement> {
  label?: string
  articles: Array<{
    thumbnail_title: string
    thumbnail_image: string
    slug: string
  }>
}

const RelatedArticlesPanel: React.SFC<RelatedArticlesPanelProps> = props => {
  const { articles, label } = props
  return (
    <RelatedArticlesContainer>
      <Label>{label}</Label>
      <Collection>
        {_.map(articles, (article, i) => {
          return (
            <ArticleLink href={`/${article.slug}`} key={`relatedArticles-${i}`}>
              <ArticleImage src={crop(article.thumbnail_image, { width: 160, height: 110 })} />
              <ArticleTitle>{article.thumbnail_title}</ArticleTitle>
            </ArticleLink>
          )
        })}
      </Collection>
    </RelatedArticlesContainer>
  )
}

RelatedArticlesPanel.defaultProps = {
  label: "Related Stories",
}
const RelatedArticlesContainer = styled.div`
  max-width: 360px;
`
const Collection = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.div`
  ${Fonts.unica("s19", "medium")} margin-bottom: 10px;
`
const ArticleLink = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
`
const ArticleImage = styled.img`
  min-width: 80px;
  height: 55px;
  margin-right: 10px;
`
const ArticleTitle = styled.span`
  ${Fonts.garamond("s17")} color: black;
`
export default RelatedArticlesPanel
