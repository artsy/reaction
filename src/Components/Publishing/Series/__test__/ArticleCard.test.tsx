import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesArticle, StandardArticle, VideoArticle } from "../../Fixtures/Articles"
import { ArticleCard } from "../ArticleCard"

it("renders an article properly", () => {
  const component = renderer.create(<ArticleCard article={StandardArticle} series={SeriesArticle} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("renders a video article properly", () => {
  const component = renderer.create(<ArticleCard article={VideoArticle} series={SeriesArticle} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("Renders media duration and play icon if article has media", () => {
  const component = mount(<ArticleCard article={VideoArticle} series={SeriesArticle} />)
  expect(component.find('.IconPlayCaret').length).toBe(1)
  expect(component.text()).toMatch('03:12')
})
