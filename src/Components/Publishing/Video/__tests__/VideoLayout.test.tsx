import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  SeriesArticle,
  StandardArticle,
  VideoArticle
} from "../../Fixtures/Articles"
import { Nav } from "../../Nav/Nav"
import { SeriesAbout } from "../../Series/SeriesAbout"
import { VideoPlayer } from "../../VideoPlayer/VideoPlayer"
import { VideoAbout } from "../VideoAbout"
import { VideoLayout } from "../VideoLayout"
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
    expect(component.find(VideoAbout).text()).toMatch("The elegant spiral of the Nautilus shell")
  })

  // it("renders related articles", () => {
  //   const component = getWrapper({
  //     relatedArticles: [VideoArticle, StandardArticle]
  //   })

  //   // expect(component.find(RelatedArticles))
  // })

  it("renders the the series footer", () => {
    const component = getWrapper({
      seriesArticle: SeriesArticle
    })
    expect(component.find(SeriesAbout).length).toBe(1)
  })
})
