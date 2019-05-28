import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import { NewDisplayCanvas } from "Components/Publishing/Display/NewDisplayCanvas"
import { VideoArticle as VideoArticleFixture } from "Components/Publishing/Fixtures/Articles"
import { VideoLayout } from "Components/Publishing/Layouts/VideoLayout"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"

import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"

describe("Video Layout with new ads enabled", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<VideoLayout {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      areHostedAdsEnabled: true,
      article: VideoArticleFixture,
      isSeries: true,
    }
  })

  it("renders the video layout properly when new ads are enabled", () => {
    const layout = renderer
      .create(<VideoLayout article={VideoArticleFixture} areHostedAdsEnabled />)
      .toJSON()
    expect(layout).toMatchSnapshot()
  })

  it("renders the video layout component with new ads component", () => {
    const component = getWrapper()

    expect(component.find(NewDisplayCanvas).length).toBe(1)
    expect(component.find(DisplayCanvas).length).toBe(0)
  })
})

describe("data", () => {
  it("renders the component with the correct data and properties on video landing pages on desktop", () => {
    const canvas = mount(
      <NewDisplayCanvas
        adDimension={
          AdDimension.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
        }
        adUnit={
          AdUnit.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
        }
        displayNewAds
        isSeries
      />
    )

    expect(canvas.props().adDimension).toEqual("970x250")
    expect(canvas.props().adUnit).toEqual("Desktop_InContentLB2")
    expect(canvas.props().displayNewAds).toBe(true)
    expect(canvas).toHaveLength(1)
    canvas.find({ className: "htl-ad" })
    canvas.find({ "data-sizes": "970x250" })
    canvas.find({ "data-eager": true })
    canvas.find({ "data-unit": "Desktop_TopLeaderboard" })
  })

  it("renders the component with the correct data and properties on series landing pages on mobile", () => {
    const canvas = mount(
      <NewDisplayCanvas
        adDimension={
          AdDimension.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom
        }
        adUnit={AdUnit.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom}
        displayNewAds
        isSeries
      />
    )

    expect(canvas.props().adDimension).toEqual("300x250")
    expect(canvas.props().adUnit).toEqual("Mobile_InContentLB2")
    expect(canvas.props().displayNewAds).toBe(true)
    expect(canvas).toHaveLength(1)
    canvas.find({ className: "htl-ad" })
    canvas.find({ "data-sizes": "300x250" })
    canvas.find({ "data-eager": true })
    canvas.find({ "data-unit": "Desktop_TopLeaderboard" })
  })
})
