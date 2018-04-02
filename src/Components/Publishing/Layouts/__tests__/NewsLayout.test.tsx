import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { NewsArticle } from "../../Fixtures/Articles"
import { NewsSectionContainer } from "../../News/NewsSections"
import { ExpandButton, NewsLayout } from "../NewsLayout"

describe("News Layout", () => {
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

  it("only expands the article on click if not mobile", () => {
    const component = mount(
      <NewsLayout article={NewsArticle} isTruncated isMobile />
    )
    component
      .find(NewsSectionContainer)
      .at(0)
      .simulate("click")
    expect(component.find(NewsSectionContainer).length).toEqual(2)
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

  it("sets a hover state onMouseEnter if desktop", () => {
    const component = mount(<NewsLayout article={NewsArticle} isTruncated />)
    component.simulate("mouseenter")
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
})
