import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesArticle, SeriesArticleSponsored } from "../../Fixtures/Articles"
import { SeriesTitle } from "../Components/SeriesTitle"

it("renders a series title properly", () => {
  const component = renderer.create(<SeriesTitle series={SeriesArticle} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("renders a sponsored series title properly", () => {
  const component = renderer.create(<SeriesTitle series={SeriesArticleSponsored} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("Renders partner block for a sponsored series", () => {
  const component = mount(<SeriesTitle series={SeriesArticleSponsored} />)
  expect(component.find('.PartnerBlock').length).toBe(1)
})

it("Does not render partner block for an unsponsored series", () => {
  const component = mount(<SeriesTitle series={SeriesArticle} />)
  expect(component.find('.PartnerBlock').length).toBe(0)
})
