import React from "react"
import styled from "styled-components"
import { Header } from "../Header/Header"
import { RelatedArticlesCanvas } from "../RelatedArticles/RelatedArticlesCanvas"
import { Sections } from "../Sections/Sections"
import { ArticleData } from "../Typings"

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

    return (
      <div>
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
      </div>
    )
  }
}

const FeatureLayoutContent = styled.div`
  display: flex;
  width: 100%;
`
