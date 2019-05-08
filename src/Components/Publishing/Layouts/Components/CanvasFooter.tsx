import { color, Separator } from "@artsy/palette"
import { CollectionsRailContent } from "Components/CollectionsRail"
import {
  ArticleData,
  DisplayData,
  RelatedArticleCanvasData,
} from "Components/Publishing//Typings"
import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import { RelatedArticlesCanvas } from "Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"

export interface CanvasFooterProps {
  display?: DisplayData
  relatedArticles?: RelatedArticleCanvasData[]
  article: ArticleData
  renderTime?: number
  showCollectionsRail?: boolean
  adUnit?: AdUnit
  adDimension?: AdDimension
}

export const CanvasFooter: React.SFC<CanvasFooterProps> = props => {
  const {
    article,
    display,
    relatedArticles,
    renderTime,
    adDimension,
    adUnit,
  } = props

  return (
    <CanvasFooterContainer>
      {relatedArticles && (
        <RelatedArticlesCanvas
          articles={relatedArticles}
          vertical={article.layout !== "news" && article.vertical}
        />
      )}

      {props.showCollectionsRail && (
        <div>
          <Separator mb={4} />
          <CollectionsRailContent {...props} articleId={article.id} />
        </div>
      )}

      {display && (
        <DisplayContainer hasBorder={relatedArticles ? true : false}>
          <DisplayCanvas
            unit={display.canvas}
            campaign={display}
            article={article}
            renderTime={renderTime}
            adUnit={adUnit}
            adDimension={adDimension}
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
  `};
  padding-bottom: 20px;
`
