import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { NewsArticle } from "../../Fixtures/Articles"
import { NewsSectionContainer } from "../../News/NewsSections"
import { NewsLayout } from "../NewsLayout"

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
    component.simulate("click")
    expect(component.find(NewsSectionContainer).length).toEqual(9)
  })
})
