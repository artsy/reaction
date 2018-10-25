import { Date } from "Components/Publishing/Byline/Date"
import { getDate } from "Components/Publishing/Constants"
import {
  SeriesArticle,
  StandardArticle,
  VideoArticle,
} from "Components/Publishing/Fixtures/Articles"
import { EditableChild } from "Components/Publishing/Fixtures/Helpers"
import { IconVideoPlay } from "Components/Publishing/Icon/IconVideoPlay"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ArticleCard, ArticleCardContainer } from "../ArticleCard"

describe("ArticleCard", () => {
  let standardArticle
  let videoArticle

  beforeEach(() => {
    videoArticle = VideoArticle
    standardArticle = StandardArticle
  })

  it("renders an article properly", () => {
    const component = renderer
      .create(<ArticleCard article={standardArticle} series={SeriesArticle} />)
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it("renders an article with unpublished media properly", () => {
    const component = renderer
      .create(<ArticleCard article={videoArticle} series={SeriesArticle} />)
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it("renders an article with children properly", () => {
    const component = renderer
      .create(
        <ArticleCard
          article={videoArticle}
          series={SeriesArticle}
          editDate={EditableChild("date")}
          editDescription={EditableChild("description")}
          editImage={EditableChild("image")}
          editTitle={EditableChild("title")}
        />
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it("Renders media duration and play icon if article has media and is published", () => {
    videoArticle.media.published = true
    const component = mount(
      <ArticleCard article={videoArticle} series={SeriesArticle} />
    )

    expect(component.find(IconVideoPlay).length).toBe(1)
    expect(component.text()).toMatch("02:28")
  })

  it("Renders coming soon and available date if article has media and is unpublished", () => {
    videoArticle.media.published = false
    const component = mount(
      <ArticleCard article={videoArticle} series={SeriesArticle} />
    )

    expect(component.find(IconVideoPlay).length).toBe(0)
    expect(component.text()).not.toMatch("03:12")
    expect(component.text()).toMatch("Coming Soon")
    expect(component.text()).toMatch("Available ")
  })

  it("Renders publish date if layout does not have media", () => {
    const component = mount(
      <ArticleCard article={StandardArticle} series={SeriesArticle} />
    )

    expect(component.find(IconVideoPlay).length).toBe(0)
    expect(component.text()).not.toMatch("Coming Soon")
    expect(component.text()).toMatch("May 19, 2017")
  })

  it("Does not render byline if article has media", () => {
    const component = mount(
      <ArticleCard article={videoArticle} series={SeriesArticle} />
    )

    expect(component.find(".author").length).toBe(0)
  })

  it("Renders the media release_date if present", () => {
    const component = mount(
      <ArticleCard article={videoArticle} series={SeriesArticle} />
    )
    const renderedDate = component
      .find(Date)
      .at(0)
      .text()
    const formattedDate = getDate(videoArticle.media.release_date, "monthYear")

    expect(renderedDate).toBe(formattedDate)
  })

  it("Renders the published_at date if no release_date and media is present", () => {
    delete videoArticle.media.release_date
    const component = mount(
      <ArticleCard article={videoArticle} series={SeriesArticle} />
    )
    const renderedDate = component
      .find(Date)
      .at(0)
      .text()
    const formattedDate = getDate(videoArticle.published_at, "monthYear")

    expect(renderedDate).toBe(formattedDate)
  })

  it("Renders editable fields if present", () => {
    const component = mount(
      <ArticleCard
        article={videoArticle}
        series={SeriesArticle}
        editDate={EditableChild("date")}
        editDescription={EditableChild("description")}
        editImage={EditableChild("image")}
        editTitle={EditableChild("title")}
      />
    )
    expect(component.text()).toMatch("Child date")
    expect(component.text()).toMatch("Child description")
    expect(component.text()).toMatch("Child image")
    expect(component.text()).toMatch("Child title")
  })

  describe("Analytics", () => {
    it("tracks article card click", () => {
      const trackEvent = jest.fn()
      const component = mount(
        <ArticleCard
          article={videoArticle}
          series={SeriesArticle}
          tracking={
            {
              trackEvent,
            } as any
          }
        />
      )
      component
        .find(ArticleCardContainer)
        .first()
        .simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "Click",
        label: "Related article card",
      })
    })
  })
})
