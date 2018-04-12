import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { FeatureArticle, SeriesArticle } from "../../Fixtures/Articles"
import { RelatedCanvas } from "../../Fixtures/Components"
import { RelatedArticlesCanvas } from "../../RelatedArticles/RelatedArticlesCanvas"
import { FeatureLayout } from "../FeatureLayout"
import { Nav } from "../../Nav/Nav"

jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("../../Sections/FullscreenViewer/withFullScreen", () => ({
  withFullScreen: x => x,
}))

it("renders RelatedArticlesCanvas", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
    />
  )
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})

it("Does not render RelatedArticlesCanvas if isSuper", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
      isSuper
    />
  )
  expect(article.find(RelatedArticlesCanvas).length).toBe(0)
})

it("renders a nav if article is in a series", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
      seriesArticle={SeriesArticle}
    />
  )
  expect(article.find(Nav).length).toBe(1)
})
