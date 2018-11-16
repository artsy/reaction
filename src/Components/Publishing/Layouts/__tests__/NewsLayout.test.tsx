import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import { NewsArticle } from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  RelatedCanvas,
} from "Components/Publishing/Fixtures/Components"
import { NewsSectionContainer } from "Components/Publishing/News/NewsSections"
import { RelatedArticlesCanvas } from "Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ExpandButton, NewsArticleContainer, NewsLayout } from "../NewsLayout"
jest.mock("isomorphic-fetch")

declare const global: any
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
)

describe("News Layout", () => {
  const dateNow = Date.now

  beforeAll(() => {
    Date.now = () => Date.parse("01 Jan 2009 00:00:00 EST")
  })

  afterAll(() => {
    Date.now = dateNow
  })
  it("renders the news layout properly", () => {
    const series = renderer
      .create(<NewsLayout article={NewsArticle} />)
      .toJSON()
    expect(series).toMatchSnapshot()
  })

  it("truncates the article", () => {
    const component = mount(<NewsLayout article={NewsArticle} isTruncated />)
    expect(component.find(NewsSectionContainer).length).toEqual(2)
  })

  it("expands the article on click", () => {
    const component = mount(<NewsLayout article={NewsArticle} isTruncated />)
    component
      .find(NewsSectionContainer)
      .at(0)
      .simulate("click")
    expect(component.find(NewsSectionContainer).length).toEqual(9)
  })

  it("expands the article on clicking expand button", () => {
    const component = mount(<NewsLayout article={NewsArticle} isTruncated />)
    component.find(ExpandButton).simulate("click")
    expect(component.find(NewsSectionContainer).length).toEqual(9)
  })

  it("Calls props.onExpand on click if provided", () => {
    const onExpand = jest.fn()
    const component = mount(
      <NewsLayout article={NewsArticle} onExpand={onExpand} isTruncated />
    )
    component.find(ExpandButton).simulate("click")
    expect(onExpand).toBeCalled()
  })

  it("Can render related articles if provided", () => {
    const component = mount(
      <NewsLayout
        article={NewsArticle}
        isTruncated
        relatedArticlesForCanvas={RelatedCanvas}
      />
    )
    expect(component.find(RelatedArticlesCanvas)).toHaveLength(1)
  })

  it("Can render display units if provided", () => {
    const component = mount(
      <NewsLayout
        article={NewsArticle}
        isTruncated
        display={Display("image")}
      />
    )
    expect(component.find(DisplayCanvas)).toHaveLength(1)
  })

  it("sets a hover state onMouseEnter if desktop", () => {
    const component = mount(<NewsLayout article={NewsArticle} isTruncated />)
    component
      .find(NewsArticleContainer)
      .at(0)
      .simulate("mouseenter")
    expect(component.state("isHovered")).toBe(true)
  })

  it("only uses hover state from props if mobile", () => {
    const component = mount(
      <NewsLayout article={NewsArticle} isTruncated isHovered isMobile />
    )
    component.simulate("mouseleave")
    expect(component.state("isHovered")).toBe(true)
  })

  it("renders the news layout on mobile", () => {
    const component = renderer.create(
      <NewsLayout article={NewsArticle} isMobile />
    )

    expect(component).toMatchSnapshot()
  })

  describe("Analytics", () => {
    it("tracks the expand button", () => {
      const trackEvent = jest.fn()
      const component = mount(
        <NewsLayout
          article={NewsArticle}
          isTruncated
          tracking={
            {
              trackEvent,
            } as any
          }
        />
      )
      component.find(ExpandButton).simulate("click")
      expect(trackEvent.mock.calls[0][0]).toEqual({
        action: "Clicked read more",
        pathname: "/news/news-article",
      })
    })
  })
})
