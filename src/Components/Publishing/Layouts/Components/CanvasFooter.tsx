import { color } from "@artsy/palette"
import {
  ArticleData,
  DisplayData,
  RelatedArticleData,
} from "Components/Publishing//Typings"
import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import RelatedArticlesCanvas from "Components/Publishing/RelatedArticles/RelatedArticlesCanvas"
import React from "react"
import styled from "styled-components"

export interface CanvasFooterProps {
  display?: DisplayData
  relatedArticles?: RelatedArticleData[]
  article: ArticleData
  renderTime?: number
}

export const CanvasFooter: React.SFC<CanvasFooterProps> = props => {
  const { article, display, relatedArticles, renderTime } = props

  return (
    <CanvasFooterContainer>
      {relatedArticles && (
        <RelatedArticlesCanvas
          articles={relatedArticles}
          vertical={article.vertical}
        />
      )}

      {display && (
        <DisplayContainer hasBorder={relatedArticles ? true : false}>
          <DisplayCanvas
            unit={display.canvas}
            campaign={display}
            article={article}
            renderTime={renderTime}
          />
        </DisplayContainer>
      )}
    </CanvasFooterContainer>
  )
}

export const CanvasFooterContainer = styled.div`
  border-top: 1px solid ${color("black10")};
`

const DisplayContainer = styled.div.attrs<{ hasBorder?: boolean }>({})`
  ${props =>
    props.hasBorder &&
    `
    border-top: 1px solid ${color("black10")}; 
  `} padding-bottom: 20px;
`
