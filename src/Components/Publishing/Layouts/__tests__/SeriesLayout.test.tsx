import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
} from "../../Fixtures/Articles"
import { SeriesLayout } from "../SeriesLayout"

it("renders a series properly", () => {
  const series = renderer
    .create(
      <SeriesLayout
        article={SeriesArticle}
        relatedArticles={[VideoArticle, StandardArticle]}
      />
    )
    .toJSON()
  expect(series).toMatchSnapshot()
})

it("renders a sponsored series properly", () => {
  const series = renderer
    .create(
      <SeriesLayout
        article={SeriesArticleSponsored}
        relatedArticles={[VideoArticle, StandardArticle]}
      />
    )
    .toJSON()
  expect(series).toMatchSnapshot()
})
