import { color } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { targetingData } from "Components/Publishing/Display/DisplayTargeting"
import { once } from "lodash"
import React, { Component } from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { NewDisplayCanvas } from "../Display/NewDisplayCanvas"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsSections } from "../News/NewsSections"
import {
  AdDimension,
  AdUnit,
  ArticleData,
  DisplayData,
  RelatedArticleCanvasData,
} from "../Typings"
import { CanvasFooter, CanvasFooterContainer } from "./Components/CanvasFooter"

interface Props {
  areHostedAdsEnabled?: boolean
  article: ArticleData
  articleSerial?: number
  display?: DisplayData
  isMobile?: boolean
  isHovered?: boolean
  isTruncated?: boolean
  onExpand?: () => void
  relatedArticlesForCanvas?: RelatedArticleCanvasData[]
  renderTime?: number
  showCollectionsRail?: boolean
  tracking?: TrackingProp
  shouldAdRender?: boolean
}

interface State {
  isTruncated: boolean
  isHovered: boolean
}

interface NewsContainerProps {
  isTruncated: boolean
  marginTop?: string
  isHovered: boolean
}

@track()
export class NewsLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isTruncated: this.props.isTruncated || false,
      isHovered: this.props.isHovered || false,
    }

    this.onExpand = this.onExpand.bind(this)
    this.trackExpand = once(this.trackExpand)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isHovered !== this.props.isHovered) {
      this.setState({ isHovered: nextProps.isHovered })
    }
  }

  onExpand() {
    const { onExpand } = this.props
    this.trackExpand()
    if (onExpand) {
      onExpand()
    }
    this.setState({ isTruncated: false })
  }

  trackExpand = () => {
    const { article, tracking } = this.props
    if (tracking) {
      tracking.trackEvent({
        action: "Clicked read more",
        pathname: `/news/${article.slug}`,
      })
    }
  }

  // Ad unit code "Desktop_InContentLB1" is for ads that appear after the 3rd article, "Desktop_InContentLB2" is for all other ads
  getAdUnit() {
    const { articleSerial, isMobile } = this.props

    if (articleSerial === 3) {
      return isMobile ? AdUnit.Mobile_InContentMR1 : AdUnit.Desktop_InContentLB1
    }
    return isMobile ? AdUnit.Mobile_InContentMR2 : AdUnit.Desktop_InContentLB2
  }

  renderAd() {
    const {
      isMobile,
      areHostedAdsEnabled,
      article,
      relatedArticlesForCanvas,
      showCollectionsRail,
      shouldAdRender,
    } = this.props
    const adUnit = this.getAdUnit()

    return (
      <>
        {shouldAdRender && (
          <NewDisplayCanvas
            adUnit={adUnit}
            adDimension={
              isMobile
                ? AdDimension.Mobile_InContentMR1
                : AdDimension.Desktop_InContentLB1
            }
            displayNewAds={areHostedAdsEnabled}
            targetingData={targetingData(article.id, "newslanding")}
          />
        )}
        {relatedArticlesForCanvas && (
          <CanvasFooter
            article={article}
            relatedArticles={relatedArticlesForCanvas}
            showCollectionsRail={showCollectionsRail}
          />
        )}
      </>
    )
  }

  render() {
    const {
      areHostedAdsEnabled,
      article,
      display,
      isMobile,
      relatedArticlesForCanvas,
      renderTime,
      showCollectionsRail,
    } = this.props
    const { isTruncated, isHovered } = this.state
    console.log("TCL: NewsLayout -> renderAd -> shouldAdRender", this.props)

    return (
      <NewsContainer>
        <NewsArticleContainer
          isTruncated={isTruncated}
          isHovered={isHovered}
          onClick={() => {
            if (isTruncated) {
              this.onExpand()
            }
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              this.setState({ isHovered: true })
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              this.setState({ isHovered: false })
            }
          }}
        >
          <NewsHeadline article={article} />
          <NewsSections {...this.props} isTruncated={isTruncated} />
          <ExpandButton
            isHovered={isHovered}
            isTruncated={isTruncated}
            onClick={this.onExpand}
          >
            Expand
          </ExpandButton>
        </NewsArticleContainer>

        {areHostedAdsEnabled
          ? this.renderAd()
          : (relatedArticlesForCanvas || display) && (
              <CanvasFooter
                article={article}
                display={display}
                relatedArticles={relatedArticlesForCanvas}
                renderTime={renderTime}
                showCollectionsRail={showCollectionsRail}
              />
            )}
      </NewsContainer>
    )
  }
}
const NewsContainer = styled.div`
  ${CanvasFooterContainer} {
    border-bottom: 1px solid ${color("black10")};
  }
`

export const ExpandButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: black;
  position: absolute;
  bottom: 30px;
  right: 30px;
  color: white;
  border-radius: 2px;
  border: none;
  display: block;
  opacity: 0;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.25s ease;
  ${unica("s14", "medium")};
  line-height: 1em;

  &:focus {
    outline: 0;
  }

  &:hover {
    color: ${color("black10")};
  }

  ${(props: NewsContainerProps) =>
    props.isHovered &&
    props.isTruncated &&
    `
      opacity: 1;
    `};

  ${pMedia.sm`
    bottom: 15px;
    right: 15px;
  `};
`

export const NewsArticleContainer = styled.div`
  position: relative;
  max-width: 780px;
  padding: 20px 30px 30px;
  margin: 40px auto;
  transition: all 0.25s ease;
  border: 1px solid transparent;

  ${(props: NewsContainerProps) =>
    props.marginTop &&
    `
    margin-top: ${props.marginTop};
  `};

  ${(props: NewsContainerProps) =>
    props.isTruncated &&
    props.isHovered &&
    `
    border-radius: 4px;
    border: 1px solid ${color("black10")};
    cursor: pointer;
  `};

  ${pMedia.sm`
    margin: 40px 5px;
    padding: 10px 15px 20px;
    ${(props: NewsContainerProps) =>
      props.marginTop &&
      `
      margin-top: ${props.marginTop};
    `};
  `};
`
