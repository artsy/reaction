import { DisplayAd } from "Components/Publishing/Display/DisplayAd"
import { targetingData } from "Components/Publishing/Display/DisplayTargeting"
import {
  SeriesArticle,
  StandardArticle,
  VideoArticle,
} from "Components/Publishing/Fixtures/Articles"
import {
  VideoArticle as VideoArticleFixture,
  VideoArticleSponsored,
} from "Components/Publishing/Fixtures/Articles"
import { Nav } from "Components/Publishing/Nav/Nav"
import { ArticleCard } from "Components/Publishing/RelatedArticles/ArticleCards/ArticleCard"
import { SeriesAbout } from "Components/Publishing/Series/SeriesAbout"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import { isEditorialSponsored } from "Components/Publishing/utils/Sponsored"
import { VideoPlayer } from "Components/Publishing/Video/Player/VideoPlayer"
import { VideoAbout } from "Components/Publishing/Video/VideoAbout"
import { mount } from "enzyme"
import "jest-styled-components"
import { clone } from "lodash"
import React from "react"
import renderer from "react-test-renderer"
import { VideoLayout } from "../VideoLayout"

describe("Video Layout", () => {
  const VideoSeriesArticle = clone({
    ...VideoArticle,
    seriesArticle: SeriesArticle,
  })

  const getWrapper = (props: any = {}) => {
    const { article, seriesArticle, relatedArticles } = props
    return mount(
      <VideoLayout
        article={article || VideoArticle}
        seriesArticle={seriesArticle || null}
        relatedArticles={relatedArticles || null}
      />
    )
  }

  it("matches the snapshot", () => {
    const videoLayout = renderer
      .create(
        <VideoLayout
          article={VideoSeriesArticle}
          relatedArticles={[VideoArticle, StandardArticle]}
        />
      )
      .toJSON()
    expect(videoLayout).toMatchSnapshot()
  })

  it("renders the nav", () => {
    const component = getWrapper()
    expect(component.find(Nav).length).toBe(1)
  })

  it("renders the player", () => {
    const component = getWrapper()
    expect(component.find(VideoPlayer).length).toBe(1)
  })

  it("renders the about section", () => {
    const component = getWrapper()
    expect(component.find(VideoAbout).length).toBe(1)
    expect(component.find(VideoAbout).text()).toMatch(
      "Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
    )
  })

  it("renders related articles", () => {
    const component = getWrapper({
      relatedArticles: [VideoArticle, StandardArticle],
    })
    expect(component.find(ArticleCard).length).toBe(2)
  })

  it("renders the the series footer", () => {
    const component = getWrapper({ article: VideoSeriesArticle })
    expect(component.find(SeriesAbout).length).toBe(1)
  })

  it("sets isPlaying to false when paused", () => {
    const component = getWrapper() as any
    component.instance().onPlayToggle(false)
    expect(component.state().isPlaying).toBe(false)
  })
})

describe("Video Layout ads", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<VideoLayout {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: VideoArticleFixture,
      isSeries: true,
    }
  })

  it("renders the video layout properly with ads", () => {
    const layout = renderer
      .create(<VideoLayout article={VideoArticleFixture} />)
      .toJSON()
    expect(layout).toMatchSnapshot()
  })

  it("renders an ad component on video series", () => {
    const component = getWrapper()

    expect(component.find(DisplayAd).length).toBe(1)
  })
})

describe("display ad data on video series", () => {
  it("renders the component with the correct target properties when video article is sponsored", () => {
    const isSponsored = isEditorialSponsored(VideoArticleSponsored.sponsor)

    const canvas = mount(
      <DisplayAd
        adDimension={
          AdDimension.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
        }
        adUnit={
          AdUnit.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
        }
        isSeries
        targetingData={targetingData(
          VideoArticleSponsored,
          isSponsored ? "sponsorlanding" : "video"
        )}
      />
    )

    expect(canvas.props().targetingData).toEqual({
      is_testing: true,
      page_type: "sponsorlanding",
      post_id: "597b9f652d35b80017a2a6a7",
      tags: "Art Market",
    })
  })

  it("renders the component with the correct target properties when video article is not sponsored", () => {
    const isSponsored = isEditorialSponsored(VideoArticleFixture.sponsor)

    const canvas = mount(
      <DisplayAd
        adDimension={
          AdDimension.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
        }
        adUnit={
          AdUnit.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
        }
        isSeries
        targetingData={targetingData(
          VideoArticleFixture,
          isSponsored ? "sponsorlanding" : "video"
        )}
      />
    )

    expect(canvas.props().targetingData).toEqual({
      is_testing: true,
      page_type: "video",
      post_id: "597b9f652d35b80017a2a6a7",
      tags: "Art Market",
    })
  })

  it("renders the component with the correct data and properties on video landing pages on desktop", () => {
    const isSponsored = isEditorialSponsored(VideoArticleFixture.sponsor)

    const canvas = mount(
      <DisplayAd
        adDimension={
          AdDimension.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
        }
        adUnit={
          AdUnit.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
        }
        isSeries
        targetingData={targetingData(
          VideoArticleFixture,
          isSponsored ? "sponsorlanding" : "video"
        )}
      />
    )

    expect(canvas.props().adDimension).toEqual("970x250")
    expect(canvas.props().adUnit).toEqual("Desktop_InContentLB2")

    expect(canvas).toHaveLength(1)
  })

  it("renders the component with the correct data and properties on series landing pages on mobile", () => {
    const canvas = mount(
      <DisplayAd
        adDimension={
          AdDimension.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom
        }
        adUnit={AdUnit.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom}
        isSeries
        targetingData={targetingData(VideoArticleFixture, "sponsorlanding")}
      />
    )

    expect(canvas.props().adDimension).toEqual("300x250")
    expect(canvas.props().adUnit).toEqual("Mobile_InContentLB2")
    expect(canvas).toHaveLength(1)
  })
})
