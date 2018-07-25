import React from "react"
import styled from "styled-components"
import { Header } from "../Header/Header"
import { Nav } from "../Nav/Nav"
import {
  ArticleCardsBlock,
  ArticleCardsContainer,
} from "../RelatedArticles/ArticleCards/Block"
import RelatedArticlesCanvas from "../RelatedArticles/RelatedArticlesCanvas"
import { Sections } from "../Sections/Sections"
import { ArticleData } from "../Typings"

export interface ArticleProps {
  article: ArticleData
  headerHeight?: string
  isMobile?: boolean
  isSuper?: boolean
  marginTop?: string
  relatedArticlesForCanvas?: any
  showTooltips?: boolean
  tracking?: any
}

export const FeatureLayout: React.SFC<ArticleProps> = props => {
  const {
    article,
    isMobile,
    isSuper,
    relatedArticlesForCanvas,
    showTooltips,
  } = props
  const { seriesArticle } = article

  // TODO: Allow more hero types to use series nav
  const hasNav =
    seriesArticle &&
    article.hero_section &&
    article.hero_section.type === "fullscreen"
  const sponsor = (seriesArticle && seriesArticle.sponsor) || article.sponsor
  const hasRelated = relatedArticlesForCanvas && !isSuper && !seriesArticle

  return (
    <FeatureLayoutContainer>
      {hasNav && (
        <Nav
          canFix={false}
          sponsor={sponsor}
          title={seriesArticle.title}
          transparent
        />
      )}
      <Header article={article} />

      <FeatureLayoutContent>
        <Sections
          article={article}
          isMobile={isMobile}
          showTooltips={showTooltips}
        />
      </FeatureLayoutContent>

      {seriesArticle && <ArticleCardsBlock {...props} />}

      {hasRelated && (
        <RelatedArticlesCanvas
          articles={relatedArticlesForCanvas}
          vertical={article.vertical}
        />
      )}
    </FeatureLayoutContainer>
  )
}

const FeatureLayoutContent = styled.div`
  display: flex;
  width: 100%;
`

const FeatureLayoutContainer = styled.div`
  position: relative;

  ${Nav} {
    position: absolute;
  }
  ${ArticleCardsContainer} {
    padding-top: 60px;
  }
`
