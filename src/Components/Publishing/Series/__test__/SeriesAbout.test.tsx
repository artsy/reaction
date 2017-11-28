import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesArticle, SeriesArticleSponsored } from "../../Fixtures/Articles"
import { SeriesAbout } from "../Components/SeriesAbout"

it("renders a series about properly", () => {
  const component = renderer.create(<SeriesAbout series={SeriesArticle} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("renders a sponsored series about properly", () => {
  const component = renderer.create(<SeriesAbout series={SeriesArticleSponsored} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("Renders partner block for a sponsored series", () => {
  const component = mount(<SeriesAbout series={SeriesArticleSponsored} />)
  expect(component.find('.PartnerBlock').length).not.toBe(0)
})

it("Does not render partner block for an unsponsored series", () => {
  const component = mount(<SeriesAbout series={SeriesArticle} />)
  expect(component.find('.PartnerBlock').length).toBe(0)
})
