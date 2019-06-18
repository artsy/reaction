import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import { DisplayPanel } from "Components/Publishing/Display/DisplayPanel"
import { targetingData } from "Components/Publishing/Display/DisplayTargeting"
import { NewDisplayCanvas } from "Components/Publishing/Display/NewDisplayCanvas"
import { NewDisplayPanel } from "Components/Publishing/Display/NewDisplayPanel"
import { StandardArticle } from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  RelatedCanvas,
  RelatedPanel,
} from "Components/Publishing/Fixtures/Components"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { StandardLayout } from "../StandardLayout"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("Standard Article with new ads hidden behind feature flags", () => {
  const getWrapper = _props => {
    return mount(<StandardLayout {..._props} />)
  }

  let standardArticleProps
  beforeEach(() => {
    standardArticleProps = {
      article: StandardArticle,
      display: Display("standard"),
      isTruncated: false,
      relatedArticlesForCanvas: RelatedCanvas,
      relatedArticlesForPanel: RelatedPanel,
      areHostedAdsEnabled: true,
    }
  })

  it("It renders new panel and canvas displays in Standard Layout Articles when feature flagged ads are enabled", () => {
    const article = getWrapper(standardArticleProps)

    expect(article.find(NewDisplayPanel).length).toBe(1)
    expect(article.find(NewDisplayCanvas).length).toBe(1)
    expect(article.find(DisplayPanel).length).toBe(0)
    expect(article.find(DisplayCanvas).length).toBe(0)
  })

  it("It does not render new panel and canvas displays in Standard Layout Articles when feature flagged ads are disabled", () => {
    standardArticleProps.areHostedAdsEnabled = false
    const article = getWrapper(standardArticleProps)

    expect(article.find(NewDisplayPanel).length).toBe(0)
    expect(article.find(NewDisplayCanvas).length).toBe(0)
    expect(article.find(DisplayPanel).length).toBe(1)
    expect(article.find(DisplayCanvas).length).toBe(1)
  })
})

describe("data", () => {
  it("renders the canvas component with the correct data and properties on standard articles", () => {
    const canvas = mount(
      <NewDisplayCanvas
        adDimension={AdDimension.Desktop_TopLeaderboard}
        adUnit={AdUnit.Desktop_TopLeaderboard}
        displayNewAds
        targetingData={targetingData(StandardArticle.id, "article")}
      />
    )

    expect(canvas.props().adDimension).toEqual("970x250")
    expect(canvas.props().adUnit).toEqual("Desktop_TopLeaderboard")
    expect(canvas.props().displayNewAds).toBe(true)
    expect(canvas.props().targetingData).toEqual({
      is_testing: true,
      page_type: "article",
      post_id: "594a7e2254c37f00177c0ea9",
    })
    expect(canvas).toHaveLength(1)
  })

  it("renders the panel component with the correct data and properties on standard articles", () => {
    const panel = mount(
      <NewDisplayPanel
        adDimension={AdDimension.Desktop_RightRail1}
        adUnit={AdUnit.Desktop_RightRail1}
        displayNewAds
        targetingData={targetingData(StandardArticle.id, "article")}
      />
    )

    expect(panel.props().adDimension).toEqual("300x250")
    expect(panel.props().adUnit).toEqual("Desktop_RightRail1")
    expect(panel.props().displayNewAds).toBe(true)
    expect(panel.props().targetingData).toEqual({
      is_testing: true,
      page_type: "article",
      post_id: "594a7e2254c37f00177c0ea9",
    })
    expect(panel).toHaveLength(1)
  })

  it("renders the panel component with the correct data and properties on standard articles on mobile", () => {
    const panel = mount(
      <NewDisplayPanel
        adDimension={AdDimension.Mobile_InContentMR1}
        adUnit={AdUnit.Mobile_InContentMR1}
        displayNewAds
        targetingData={targetingData(StandardArticle.id, "article")}
      />
    )

    expect(panel.props().adDimension).toEqual("300x250")
    expect(panel.props().adUnit).toEqual("Mobile_InContentMR1")
    expect(panel.props().displayNewAds).toBe(true)
    expect(panel.props().targetingData).toEqual({
      is_testing: true,
      page_type: "article",
      post_id: "594a7e2254c37f00177c0ea9",
    })
    expect(panel).toHaveLength(1)
  })

  it("renders the canvas component with the correct data and properties on standard articles on mobile", () => {
    const canvas = mount(
      <NewDisplayCanvas
        adDimension={AdDimension.Mobile_TopLeaderboard}
        adUnit={AdUnit.Mobile_TopLeaderboard}
        displayNewAds
        targetingData={targetingData(StandardArticle.id, "article")}
      />
    )

    expect(canvas.props().adDimension).toEqual("300x50")
    expect(canvas.props().adUnit).toEqual("Mobile_TopLeaderboard")
    expect(canvas.props().displayNewAds).toBe(true)
    expect(canvas.props().targetingData).toEqual({
      is_testing: true,
      page_type: "article",
      post_id: "594a7e2254c37f00177c0ea9",
    })
    expect(canvas).toHaveLength(1)
  })
})
