import { color, space } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { getEditorialHref } from "Components/Publishing/Constants"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import { get, omit } from "lodash"
import React from "react"
import { Bling as GPT } from "react-gpt"
import styled from "styled-components"
import { Responsive } from "Utils/Responsive"
import { pMedia } from "../../Helpers"
import { ArticleProps } from "../Article"
import { DisplayPanel } from "../Display/DisplayPanel"
import { NewDisplayCanvas } from "../Display/NewDisplayCanvas"
import { NewDisplayPanel } from "../Display/NewDisplayPanel"
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

  isHTLAdEnabled() {
    return true
  }

  render() {
    const {
      areHostedAdsEnabled,
      article,
      display,
      emailSignupUrl,
      infiniteScrollEntrySlug,
      isMobile,
      relatedArticlesForCanvas,
      relatedArticlesForPanel,
      renderTime,
      showTooltips,
      showCollectionsRail,
      isSuper,
    } = this.props

    const { isTruncated } = this.state
    const { seriesArticle } = article
    const campaign = omit(display, "panel", "canvas")
    const seriesOrSuper = isSuper || seriesArticle

    GPT.refresh()

    return (
      <Responsive>
        {({ xs, sm, md }) => {
          const hasPanel = get(display, "panel", false)
          const isMobileAd = Boolean(isMobile || xs || sm || md)

          const DisplayPanelAd = () => {
            if (areHostedAdsEnabled) {
              return (
                <NewDisplayPanel
                  adUnit={
                    isMobileAd
                      ? AdUnit.Mobile_InContentMR1
                      : AdUnit.Desktop_RightRail1
                  }
                  adDimension={
                    isMobileAd
                      ? AdDimension.Mobile_InContentMR1
                      : AdDimension.Desktop_RightRail1
                  }
                  displayNewAds={areHostedAdsEnabled}
                />
              )
            } else {
              return (
                hasPanel && (
                  <DisplayPanel
                    isMobile={isMobileAd}
                    unit={display.panel}
                    campaign={campaign}
                    article={article}
                    renderTime={renderTime}
                  />
                )
              )
            }
          }
          return (
            <ArticleWrapper isInfiniteScroll={this.props.isTruncated}>
              {areHostedAdsEnabled && (
                <NewDisplayCanvas
                  adUnit={
                    isMobileAd
                      ? AdUnit.Mobile_TopLeaderboard
                      : AdUnit.Desktop_TopLeaderboard
                  }
                  adDimension={
                    isMobileAd
                      ? AdDimension.Mobile_TopLeaderboard
                      : AdDimension.Desktop_TopLeaderboard
                  }
                  displayNewAds={areHostedAdsEnabled}
                />
              )}
              <ReadMoreWrapper
                isTruncated={isTruncated}
                hideButton={() => this.setState({ isTruncated: false })}
              >
                <Header article={article} />

                <StandardLayoutParent>
                  <StandardLayoutContainer>
                    <Sections
                      DisplayPanel={DisplayPanelAd}
                      article={article}
                      isMobile={isMobile}
                      showTooltips={showTooltips}
                    />
                    <Sidebar
                      emailSignupUrl={emailSignupUrl}
                      DisplayPanel={DisplayPanelAd}
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

              {(relatedArticlesForCanvas || display) &&
                !seriesOrSuper &&
                !areHostedAdsEnabled && (
                  <CanvasFooter
                    article={article}
                    display={display}
                    relatedArticles={relatedArticlesForCanvas}
                    renderTime={renderTime}
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
