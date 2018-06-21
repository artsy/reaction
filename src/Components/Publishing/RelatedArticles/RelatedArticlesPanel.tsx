import { garamond, unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { crop } from "../../../Utils/resizer"
import { getArticleHref } from "../Constants"

interface RelatedArticlesPanelProps extends React.HTMLProps<HTMLDivElement> {
  label?: string
  articles: Array<{
    thumbnail_title: string
    thumbnail_image: string
    slug: string
  }>
}

export const RelatedArticlesPanel: React.SFC<
  RelatedArticlesPanelProps
> = props => {
  const { articles, label } = props

  return (
    <RelatedArticlesContainer>
      <Label>{label}</Label>

      <Collection>
        {articles.map((article, i) => {
          const href = getArticleHref(article.slug)
          const articleImageSrc = crop(article.thumbnail_image, {
            width: 160,
            height: 110,
          })

          return (
            <ArticleLink href={href} key={`relatedarticles-${i}`}>
              <ArticleImage src={articleImageSrc} />
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
  ${unica("s16", "medium")} margin-bottom: 10px;
`

const ArticleLink = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`

const ArticleImage = styled.img`
  min-width: 80px;
  height: 55px;
  margin-right: 10px;
`

const ArticleTitle = styled.span`
  ${garamond("s17")} color: black;
`
