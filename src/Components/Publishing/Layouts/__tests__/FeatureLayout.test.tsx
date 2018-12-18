import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import {
  FeatureArticle,
  SeriesArticle,
  SeriesArticleSponsored,
} from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  RelatedCanvas,
} from "Components/Publishing/Fixtures/Components"
import { Nav } from "Components/Publishing/Nav/Nav"
import { ArticleCardsBlock } from "Components/Publishing/RelatedArticles/ArticleCards/Block"
import { RelatedArticlesCanvas } from "Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { SeriesAbout } from "Components/Publishing/Series/SeriesAbout"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep, extend } from "lodash"
import React from "react"
import { FeatureLayout } from "../FeatureLayout"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

it("renders RelatedArticlesCanvas if article is not super or in a series", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
    />
  )
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})

it("Does not render RelatedArticlesCanvas if article is super", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
      isSuper
    />
  )
  expect(article.find(RelatedArticlesCanvas).length).toBe(0)
})

it("Does not render RelatedArticlesCanvas if article is super and display is not undefined", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
      display={Display("feature")}
      isSuper
    />
  )
  expect(article.find(RelatedArticlesCanvas).length).toBe(0)
})

it("Does not render RelatedArticlesCanvas if article is in a series", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    seriesArticle: SeriesArticle,
  })
  const article = mount(
    <FeatureLayout
      article={Article}
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

it("renders display if article is not super or in a series", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
      display={Display("feature")}
    />
  )
  expect(article.find(DisplayCanvas).length).toBe(1)
})

it("does not render display if article is in a series", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    seriesArticle: SeriesArticle,
  })
  const article = mount(
    <FeatureLayout
      article={Article}
      relatedArticlesForCanvas={RelatedCanvas}
      display={Display("feature")}
    />
  )
  expect(article.find(DisplayCanvas).length).toBe(0)
})

it("does not render display if article is super", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
      display={Display("feature")}
      isSuper
    />
  )
  expect(article.find(DisplayCanvas).length).toBe(0)
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
    relatedArticles: [FeatureArticle],
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
