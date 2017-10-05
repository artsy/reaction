import * as _ from "lodash"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import RelatedArticleFigure from "./related_article_figure"

interface RelatedArticlesCanvasProps extends React.HTMLProps<HTMLDivElement> {
  vertical: {
    name: string
    id?: string
  }
  articles: Array<{
    thumbnail_title: string
    thumbnail_image: string
    slug: string
  }>
}

const RelatedArticlesCanvas: React.SFC<RelatedArticlesCanvasProps> = props => {
  const { articles, vertical } = props
  if (!vertical) {
    return <div />
  } else {
    return (
      <RelatedArticlesContainer>
        <Title>Further Reading in <VerticalSpan>{vertical.name}</VerticalSpan></Title>
        <ArticlesWrapper>
          {_.map(articles, (article, i) => {
            return <RelatedArticleFigure article={article} key={`related-article-figure-${i}`} />
          })}
        </ArticlesWrapper>
      </RelatedArticlesContainer>
    )
  }
}

const RelatedArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  margin: 30px auto 60px auto;
  ${pMedia.lg`
    margin: 30px 20px 60px 20px;
  `}
`
const Title = styled.div`
  ${Fonts.unica("s32")}
  margin-bottom: 30px;
`
const VerticalSpan = styled.span`
  ${pMedia.sm`
    display: block;
  `}
`
const ArticlesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export default RelatedArticlesCanvas
