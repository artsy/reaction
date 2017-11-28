import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesArticle, SeriesArticleSponsored } from "../../Fixtures/Articles"
import { Series } from "../Series"

it("renders a series properly", () => {
  const series = renderer.create(<Series series={SeriesArticle} />).toJSON()
  expect(series).toMatchSnapshot()
})

it("renders a sponsored series properly", () => {
  const series = renderer.create(<Series series={SeriesArticleSponsored} />).toJSON()
  expect(series).toMatchSnapshot()
})
