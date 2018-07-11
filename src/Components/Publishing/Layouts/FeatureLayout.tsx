import { once } from "lodash"
import React from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { track } from "../../../Utils/track"
import { Header } from "../Header/Header"
import { Nav } from "../Nav/Nav"
import {
  ArticleCardsBlock,
  ArticleCardsContainer,
} from "../RelatedArticles/ArticleCards/Block"
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
  showTooltips?: boolean
  tracking?: any
}

export class FeatureLayout extends React.Component<ArticleProps> {
  public trackRelated

  constructor(props) {
    super(props)
    this.trackRelated = once(this.trackRelatedImpression)
  }

  trackRelatedImpression = () => {
    const { tracking } = this.props

    tracking.trackEvent({
      action: "Impression",
      impression_type: "Further reading",
    })
  }

  render() {
    const {
      article,
      headerHeight,
      isMobile,
      isSuper,
      relatedArticlesForCanvas,
      showTooltips,
    } = this.props
    const { seriesArticle } = article

    // TODO: Allow more hero types to use series nav
    const hasNav =
      seriesArticle &&
      article.hero_section &&
      article.hero_section.type === "fullscreen"
    const sponsor = (seriesArticle && seriesArticle.sponsor) || article.sponsor
    const height = hasNav ? "100vh" : headerHeight

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
        <Header article={article} height={height} isMobile={isMobile} />

        <FeatureLayoutContent className="article-content">
          <Sections
            article={article}
            isMobile={isMobile}
            showTooltips={showTooltips}
          />
        </FeatureLayoutContent>

        {relatedArticlesForCanvas &&
          !isSuper &&
          !seriesArticle && (
            <div>
              <Waypoint onEnter={this.trackRelated} />
              <RelatedArticlesCanvas
                articles={relatedArticlesForCanvas}
                vertical={article.vertical}
              />
            </div>
          )}
        {seriesArticle && <ArticleCardsBlock {...this.props} />}
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
  ${ArticleCardsContainer} {
    padding-top: 60px;
  }
`

export default track()(FeatureLayout)
