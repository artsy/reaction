import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesArticle, SeriesArticleSponsored } from "../../Fixtures/Articles"
import { SeriesTitle } from "../SeriesTitle"

it("renders a series title properly", () => {
  const component = renderer.create(<SeriesTitle article={SeriesArticle} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("renders a sponsored series title properly", () => {
  const component = renderer.create(<SeriesTitle article={SeriesArticleSponsored} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("Renders partner block for a sponsored series", () => {
  const component = mount(<SeriesTitle article={SeriesArticleSponsored} />)
  expect(component.find('.PartnerBlock').length).toBe(1)
})

it("Does not render partner block for an unsponsored series", () => {
  const component = mount(<SeriesTitle article={SeriesArticle} />)
  expect(component.find('.PartnerBlock').length).toBe(0)
})
