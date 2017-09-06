import React from "react"
import styled from "styled-components"
import { crop } from "../../../utils/resizer"
import { pMedia } from "../../helpers"
import { articleHref } from "../constants"
import Fonts from "../fonts"

interface RelatedArticleFigureProps extends React.HTMLProps<HTMLDivElement> {
  article: {
    thumbnail_title: string
    thumbnail_image: string
    slug: string
  }
}

const RelatedArticleFigure: React.SFC<RelatedArticleFigureProps> = props => {
  const { article } = props
  return (
    <ArticleFigure href={articleHref(article.slug)}>
      <BlockImage src={crop(article.thumbnail_image, { width: 510, height: 340 })} alt={article.thumbnail_title} />
      <ArticleTitle>{article.thumbnail_title}</ArticleTitle>
    </ArticleFigure>
  )
}

const ArticleFigure = styled.a`
  display: flex;
  flex-direction: column;
  max-width: 255px;
  color: black;
  text-decoration: none;
  ${pMedia.lg`
    margin-right: 20px;
  `}
`
const ArticleTitle = styled.div`
  ${Fonts.unica("s16")}
`
const BlockImage = styled.img`
  display: block;
  width: 255px;
  height: 170px;
  margin-bottom: 10px;
`

export default RelatedArticleFigure
