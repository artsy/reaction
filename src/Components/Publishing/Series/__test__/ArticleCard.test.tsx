import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesArticle, StandardArticle, VideoArticle } from "../../Fixtures/Articles"
import { ArticleCard } from "../ArticleCard"

it("renders an article properly", () => {
  const articleCard = renderer.create(<ArticleCard article={StandardArticle} series={SeriesArticle} />).toJSON()
  expect(articleCard).toMatchSnapshot()
})

it("renders a video article properly", () => {
  const articleCard = renderer.create(<ArticleCard article={StandardArticle} series={VideoArticle} />).toJSON()
  expect(articleCard).toMatchSnapshot()
})
