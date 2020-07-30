import { color } from "@artsy/palette"
import {
  ArticleData,
  RelatedArticleCanvasData,
} from "Components/Publishing//Typings"
import { RelatedArticlesCanvas } from "Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import React from "react"
import styled from "styled-components"

export interface CanvasFooterProps {
  relatedArticles?: RelatedArticleCanvasData[]
  article: ArticleData
}

export const CanvasFooter: React.SFC<CanvasFooterProps> = props => {
  const { article, relatedArticles } = props

  return (
    <CanvasFooterContainer>
      {relatedArticles && (
        <RelatedArticlesCanvas
          articles={relatedArticles}
          vertical={article.layout !== "news" && article.vertical}
        />
      )}
    </CanvasFooterContainer>
  )
}

export const CanvasFooterContainer = styled.div`
  border-top: 1px solid ${color("black10")};
`
