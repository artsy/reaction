import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesArticle, SeriesArticleSponsored } from "../../Fixtures/Articles"
import { SeriesAbout } from "../SeriesAbout"

it("renders a series about properly", () => {
  const component = renderer.create(<SeriesAbout article={SeriesArticle} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("renders a sponsored series about properly", () => {
  const component = renderer.create(<SeriesAbout article={SeriesArticleSponsored} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("renders series about with children properly", () => {
  const component = renderer.create(
    <SeriesAbout article={SeriesArticle}>
      <div>Child 0: description</div>
    </SeriesAbout>
  ).toJSON()
  expect(component).toMatchSnapshot()
})

it("Renders partner block for a sponsored series", () => {
  const component = mount(<SeriesAbout article={SeriesArticleSponsored} />)
  expect(component.find('.PartnerBlock').length).not.toBe(0)
})

it("Does not render partner block for an unsponsored series", () => {
  const component = mount(<SeriesAbout article={SeriesArticle} />)
  expect(component.find('.PartnerBlock').length).toBe(0)
})

it("Renders children if present", () => {
  const component = mount(
    <SeriesAbout article={SeriesArticle}>
      <div>Child 0: description</div>
    </SeriesAbout>
  )
  expect(component.text()).toMatch('Child 0: description')
})
