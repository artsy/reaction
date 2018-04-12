import React from "react"
import styled from "styled-components"
import { Header } from "../Header/Header"
import { RelatedArticlesCanvas } from "../RelatedArticles/RelatedArticlesCanvas"
import { Sections } from "../Sections/Sections"
import { ArticleData } from "../Typings"
import { Nav } from "../Nav/Nav"

export interface ArticleProps {
  article: ArticleData
  headerHeight?: string
  isMobile?: boolean
  isSuper?: boolean
  marginTop?: string
  relatedArticlesForCanvas?: any
  seriesArticle?: any
}

export class FeatureLayout extends React.Component<ArticleProps> {
  render() {
    const {
      article,
      headerHeight,
      isMobile,
      isSuper,
      relatedArticlesForCanvas,
      seriesArticle,
    } = this.props

    return (
      <FeatureLayoutContainer>
        {seriesArticle && (
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
          !isSuper && (
            <RelatedArticlesCanvas
              articles={relatedArticlesForCanvas}
              vertical={article.vertical}
            />
          )}
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
