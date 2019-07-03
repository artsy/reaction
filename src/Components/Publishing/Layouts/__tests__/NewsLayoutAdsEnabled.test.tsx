import { DisplayAd } from "Components/Publishing/Display/DisplayAd"
import { NewsArticle } from "Components/Publishing/Fixtures/Articles"

import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { NewsLayout } from "../NewsLayout"
jest.mock("isomorphic-fetch")

declare const global: any
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
)

describe("News Layout with new ads enabled", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<NewsLayout {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      shouldAdRender: true,
      areHostedAdsEnabled: true,
      article: NewsArticle,
    }
  })

  it("renders the news layout properly when new ads are enabled", () => {
    const layout = renderer
      .create(
        <NewsLayout article={NewsArticle} shouldAdRender areHostedAdsEnabled />
      )
      .toJSON()

    expect(layout).toMatchSnapshot()
  })

  it("renders the news layout component with new ads component", () => {
    const component = getWrapper()

    expect(component.find(DisplayAd).length).toBe(1)
  })

  it("renders the news layout component with correct ad unit after the 3rd article on desktop", () => {
    props.articleSerial = 3
    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Desktop_Leaderboard1")
    expect(ads.prop("adDimension")).toEqual("970x250")
    expect(ads.prop("targetingData")).toEqual({
      is_testing: true,
      page_type: "newslanding",
      post_id: "594a7e2254c37f00177c0ea9",
    })
  })

  it("renders the news layout component with correct ad unit after the 3rd article on mobile", () => {
    props.articleSerial = 3
    props.isMobile = true

    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Mobile_InContentMR1")
    expect(ads.prop("adDimension")).toEqual("300x50")
    expect(ads.prop("targetingData")).toEqual({
      is_testing: true,
      page_type: "newslanding",
      post_id: "594a7e2254c37f00177c0ea9",
    })
  })

  it("renders the news layout component with correct ad unit after the 9th article on desktop", () => {
    props.articleSerial = 9
    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Desktop_Leaderboard2")
    expect(ads.prop("adDimension")).toEqual("970x250")
  })

  it("renders the news layout component with correct ad unit after the 9th article on mobile", () => {
    props.articleSerial = 9
    props.isMobile = true

    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Mobile_InContentMR2")
    expect(ads.prop("adDimension")).toEqual("300x50")
  })

  it("renders the news layout component with correct ad unit after the 15th article on desktop", () => {
    props.articleSerial = 15
    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Desktop_LeaderboardRepeat")
    expect(ads.prop("adDimension")).toEqual("970x250")
  })

  it("renders the news layout component with correct ad unit after the 15th article on mobile", () => {
    props.articleSerial = 15
    props.isMobile = true
    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Mobile_InContentMRRepeat")
    expect(ads.prop("adDimension")).toEqual("300x50")
  })
})
