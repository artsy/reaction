import { color, space } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { getEditorialHref } from "Components/Publishing/Constants"
import { DisplayAd } from "Components/Publishing/Display/DisplayAd"
import { targetingData } from "Components/Publishing/Display/DisplayTargeting"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { Responsive } from "Utils/Responsive"
import { pMedia } from "../../Helpers"
import { ArticleProps } from "../Article"
import { Header } from "../Header/Header"
import { ReadMoreButton } from "../ReadMore/ReadMoreButton"
import { ReadMoreWrapper } from "../ReadMore/ReadMoreWrapper"
import { Sections } from "../Sections/Sections"
import { CanvasFooter } from "./Components/CanvasFooter"
import { Sidebar } from "./Components/Sidebar"

interface ArticleState {
  isTruncated: boolean
}

@track()
export class StandardLayout extends React.Component<
  ArticleProps,
  ArticleState
> {
  static defaultProps = {
    isMobile: false,
    isSuper: false,
    article: {},
    isTruncated: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      isTruncated: props.isTruncated || false,
    }
  }

  @track<ArticleProps>(props => {
    // Track here and on ReadMoreButton so pageview & action both fire
    const {
      article: { layout, slug },
      infiniteScrollEntrySlug,
    } = props
    const referrer = infiniteScrollEntrySlug
      ? `/article/${infiniteScrollEntrySlug}`
      : undefined

    return {
      action_type: Schema.ActionType.Click,
      context_module: Schema.ContextModule.ReadMore,
      destination_path: getEditorialHref(layout, slug),
      subject: Schema.Subject.ReadMore,
      referrer,
    }
  })
  removeTruncation() {
    this.setState({ isTruncated: false })
  }

  renderSideRailDisplayAd(isMobileAd: boolean) {
    const { article, isSuper } = this.props

    if (isSuper) {
      return
    }

    return (
      <DisplayAd
        adUnit={
          isMobileAd ? AdUnit.Mobile_InContentMR1 : AdUnit.Desktop_RightRail1
        }
        adDimension={
          isMobileAd
            ? AdDimension.Mobile_InContentMR1
            : AdDimension.Desktop_RightRail1
        }
        targetingData={targetingData(article, "article")}
      />
    )
  }

  renderTopRailDisplayAd(isMobileAd: boolean) {
    const { article, isSuper } = this.props
    const adDimension = isMobileAd
      ? AdDimension.Mobile_InContentMR1
      : AdDimension.Desktop_TopLeaderboard

    if (isSuper) {
      return
    }

    return (
      <DisplayAd
        adUnit={
          isMobileAd
            ? AdUnit.Mobile_InContentMR1
            : AdUnit.Desktop_TopLeaderboard
        }
        adDimension={adDimension}
        targetingData={targetingData(article, "article")}
      />
    )
  }

  render() {
    const {
      article,
      emailSignupUrl,
      infiniteScrollEntrySlug,
      isMobile,
      relatedArticlesForCanvas,
      relatedArticlesForPanel,
      showTooltips,
      showCollectionsRail,
      isSuper,
    } = this.props

    const { isTruncated } = this.state
    const { seriesArticle } = article
    const seriesOrSuper = isSuper || seriesArticle

    return (
      <Responsive>
        {({ xs, sm, md }) => {
          const isMobileAd = Boolean(isMobile || xs || sm || md)
          const sideRailDisplayAd = () => (
            <>{this.renderSideRailDisplayAd(isMobileAd)}</>
          )

          return (
            <ArticleWrapper isInfiniteScroll={this.props.isTruncated}>
              {this.renderTopRailDisplayAd(isMobileAd)}

              <ReadMoreWrapper
                isTruncated={isTruncated}
                hideButton={() => this.setState({ isTruncated: false })}
              >
                <Header article={article} />

                <StandardLayoutParent>
                  <StandardLayoutContainer>
                    <Sections
                      DisplayPanel={sideRailDisplayAd}
                      article={article}
                      isMobile={isMobile}
                      showTooltips={showTooltips}
                    />
                    <Sidebar
                      emailSignupUrl={emailSignupUrl}
                      DisplayPanel={sideRailDisplayAd}
                      relatedArticlesForPanel={relatedArticlesForPanel}
                    />
                  </StandardLayoutContainer>
                </StandardLayoutParent>
              </ReadMoreWrapper>

              {isTruncated && (
                <ReadMoreButton
                  onClick={this.removeTruncation.bind(this)}
                  referrer={`/article/${infiniteScrollEntrySlug}`}
                />
              )}

              {relatedArticlesForCanvas && !seriesOrSuper && (
                <CanvasFooter
                  article={article}
                  relatedArticles={relatedArticlesForCanvas}
                  showCollectionsRail={showCollectionsRail}
                />
              )}
            </ArticleWrapper>
          )
        }}
      </Responsive>
    )
  }
}

export const StandardLayoutParent = styled.div`
  margin: 0 40px 100px 40px;
  ${pMedia.sm`
    margin: 0 0 100px 0;
  `};
`

const ArticleWrapper = styled.div.attrs<{ isInfiniteScroll?: boolean }>({})`
  ${props =>
    props.isInfiniteScroll &&
    `
    padding-top: ${space(4)}px;
    border-top: 1px solid ${color("black10")};
  `};
`

const StandardLayoutContainer = styled.div`
  max-width: 1250px;
  display: flex;
  margin: auto;
  justify-content: space-between;
`
