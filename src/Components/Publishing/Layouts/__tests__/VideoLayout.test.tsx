import {
  SeriesArticle,
  StandardArticle,
  VideoArticle,
} from "Components/Publishing/Fixtures/Articles"
import { Nav } from "Components/Publishing/Nav/Nav"
import { ArticleCard } from "Components/Publishing/RelatedArticles/ArticleCards/ArticleCard"
import { SeriesAbout } from "Components/Publishing/Series/SeriesAbout"
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
