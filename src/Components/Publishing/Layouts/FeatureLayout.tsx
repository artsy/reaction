import React from "react"
import styled from "styled-components"
import { Header } from "../Header/Header"
import { RelatedArticlesCanvas } from "../RelatedArticles/RelatedArticlesCanvas"
import { Sections } from "../Sections/Sections"
import { ArticleData } from "../Typings"
import { Nav } from "../Nav/Nav"
import { RelatedArticleCardFooter } from "../RelatedArticles/RelatedArticleCardFooter"

export interface ArticleProps {
  article: ArticleData
  headerHeight?: string
  isMobile?: boolean
  isSuper?: boolean
  marginTop?: string
  relatedArticlesForCanvas?: any
}

export class FeatureLayout extends React.Component<ArticleProps> {
  render() {
    const {
      article,
      headerHeight,
      isMobile,
      isSuper,
      relatedArticlesForCanvas,
    } = this.props
    const { seriesArticle } = article

    // TODO: Allow more hero types to use series nav
    const hasNav =
      seriesArticle &&
      article.hero_section &&
      article.hero_section.type === "fullscreen"

    return (
      <FeatureLayoutContainer>
        {hasNav && (
          <Nav
            canFix={false}
            sponsor={article.sponsor}
            title={seriesArticle.title}
            transparent
          />
        )}
        <Header article={article} height={headerHeight} isMobile={isMobile} />

        <FeatureLayoutContent className="article-content">
          <Sections article={article} isMobile={isMobile} />
        </FeatureLayoutContent>

        {relatedArticlesForCanvas &&
          !isSuper &&
          !seriesArticle && (
            <RelatedArticlesCanvas
              articles={relatedArticlesForCanvas}
              vertical={article.vertical}
            />
          )}
        {seriesArticle && <RelatedArticleCardFooter {...this.props} />}
      </FeatureLayoutContainer>
    )
  }
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
`
