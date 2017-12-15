import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  SeriesArticle,
  StandardArticle,
  VideoArticle
} from "../../Fixtures/Articles"
import { IconVideoPlay } from "../../Icon/IconVideoPlay"
import { Nav } from "../../Nav/Nav"
import { ArticleCard } from "../../Series/ArticleCard"
import { SeriesAbout } from "../../Series/SeriesAbout"
import { VideoPlayer } from "../../Video/Player/VideoPlayer"
import { VideoAbout } from "../../Video/VideoAbout"
import { VideoLayout } from "../VideoLayout"
import track, { track as trackWithoutProps } from '../../../../Utils/track'

jest.mock('../../../../Utils/track.ts', () => ({
  track: jest.fn()
}))

describe("Video Layout", () => {
  const getWrapper = (props: any = {}) => {
    return mount(
      <VideoLayout
        article={props.article || VideoArticle}
        seriesArticle={props.seriesArticle || null}
        relatedArticles={props.relatedArticles || null}
      />
    )
  }

  it("matches the snapshot", () => {
    const videoLayout = renderer.create(
      <VideoLayout
        article={VideoArticle}
        seriesArticle={SeriesArticle}
        relatedArticles={[VideoArticle, StandardArticle]}
      />
    ).toJSON()
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
    expect(component.find(VideoAbout).text()).toMatch("Integer posuere erat a ante venenatis dapibus posuere velit aliquet.")
  })

  it("renders related articles", () => {
    const component = getWrapper({
      relatedArticles: [VideoArticle, StandardArticle]
    })
    expect(component.find(ArticleCard).length).toBe(2)
  })

  it("renders the the series footer", () => {
    const component = getWrapper({
      seriesArticle: SeriesArticle
    })
    expect(component.find(SeriesAbout).length).toBe(1)
  })

  it("sets isPlaying to false when paused", () => {
    const component = getWrapper()
    component.instance().onPlayToggle(false)
    expect(component.state().isPlaying).toBe(false)
  })
})
