import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { cloneDeep, extend } from "lodash"
import {
  FeatureArticle,
  SeriesArticle,
  SeriesArticleSponsored,
} from "../../Fixtures/Articles"
import { RelatedCanvas } from "../../Fixtures/Components"
import { RelatedArticlesCanvas } from "../../RelatedArticles/RelatedArticlesCanvas"
import { ArticleCardsBlock } from "../../RelatedArticles/ArticleCards/Block"
import { SeriesAbout } from "../../Series/SeriesAbout"
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
  const Article = extend(cloneDeep(FeatureArticle), {
    seriesArticle: SeriesArticle,
  })
  const article = mount(
    <FeatureLayout article={Article} relatedArticlesForCanvas={RelatedCanvas} />
  )
  expect(article.find(Nav).length).toBe(1)
})

it("does not render a nav if article has a non-fullscreen header", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    hero_section: {
      type: "basic",
    },
    seriesArticle: SeriesArticle,
  })
  const article = mount(
    <FeatureLayout article={Article} relatedArticlesForCanvas={RelatedCanvas} />
  )
  expect(article.find(Nav).length).toBe(0)
})

it("renders related article cards if in a series", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    seriesArticle: SeriesArticle,
  })
  const article = mount(
    <FeatureLayout article={Article} relatedArticlesForCanvas={RelatedCanvas} />
  )
  expect(article.find(ArticleCardsBlock).length).toBe(1)
})

it("renders sponsor info if in a sponsored series", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    seriesArticle: SeriesArticleSponsored,
  })
  const article = mount(
    <FeatureLayout article={Article} relatedArticlesForCanvas={RelatedCanvas} />
  )
  expect(article.find(SeriesAbout).length).toBe(1)
})
