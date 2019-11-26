import { mockTracking } from "Artsy/Analytics"
import {
  DisplayAd,
  DisplayAdContainer,
  DisplayAdProps,
} from "Components/Publishing/Display/DisplayAd"
import { targetingData } from "Components/Publishing/Display/DisplayTargeting"
import { StandardArticle } from "Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Bling as GPT } from "react-gpt"
import renderer from "react-test-renderer"
import Waypoint from "react-waypoint"
import { ArticleDisplayAdProps as AdData } from "../../Fixtures/Components"
jest.unmock("react-tracking")

describe("Display Ad", () => {
  const displayAdProps = {
    adDimension: AdData.adDimension,
    adUnit: AdData.adUnit,
    targetingData: targetingData(StandardArticle, "article"),
    articleSlug: StandardArticle.slug,
  }

  it("renders the new canvas in standard layout", () => {
    const component = renderer
      .create(<DisplayAd {...displayAdProps} />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("renders the component with the correct data and properties in standard layout articles", () => {
    const ad = mount(<DisplayAd {...displayAdProps} />)

    const adProps: DisplayAdProps = ad.props()
    expect(adProps.adDimension).toEqual("970x250")
    expect(adProps.adUnit).toEqual("Desktop_TopLeaderboard")
    expect(ad).toHaveLength(1)
  })

  it("renders GPT with the correct properties in standard layout articles", () => {
    const ad = mount(<DisplayAd {...displayAdProps} />)

    const gptComponent = ad.find(GPT)
    const gptProps: any = gptComponent.props()
    expect(gptProps.adUnitPath).toEqual("/21805539690/Desktop_TopLeaderboard")
    expect(gptProps.targeting).toEqual({
      is_testing: true,
      page_type: "article",
      post_id: "594a7e2254c37f00177c0ea9",
      tags: "Art Market",
    })
    expect(gptProps.slotSize).toEqual([970, 250])
  })

  it("Tracks display ad impression", () => {
    const { Component, dispatch } = mockTracking(DisplayAd)

    const component = mount(<Component {...displayAdProps} />)

    component
      .find(Waypoint)
      .getElement()
      .props.onEnter()

    expect(dispatch).toBeCalledWith({
      action_type: "Impression",
      context_page: "Article",
      context_module: "AdServer",
      context_page_owner_type: "Article",
      context_page_owner_id: StandardArticle.id,
      context_page_owner_slug: StandardArticle.slug,
    })
  })

  it("Tracks display ad click", () => {
    const { Component, dispatch } = mockTracking(DisplayAd)

    const component = mount(<Component {...displayAdProps} />)

    component
      .find(DisplayAdContainer)
      .at(0)
      .simulate("click")

    expect(dispatch).toBeCalledWith({
      action_type: "Click",
      context_page: "Article",
      context_module: "AdServer",
      context_page_owner_type: "Article",
      context_page_owner_id: StandardArticle.id,
      context_page_owner_slug: StandardArticle.slug,
    })
  })
})
