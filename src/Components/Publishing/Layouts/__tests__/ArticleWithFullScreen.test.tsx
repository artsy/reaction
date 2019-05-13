import {
  FeatureArticle,
  StandardArticle,
} from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  RelatedCanvas,
  RelatedPanel,
} from "Components/Publishing/Fixtures/Components"
import { RelatedArticlesCanvas } from "Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "Components/Publishing/RelatedArticles/Panel/RelatedArticlesPanel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { ArticleWithFullScreen } from "../ArticleWithFullScreen"
import { FeatureLayout } from "../FeatureLayout"
import { StandardLayout } from "../StandardLayout"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)
jest.mock("Components/Publishing/ToolTip/TooltipsDataLoader", () => ({
  TooltipsData: props => props.children,
}))

jest.mock("sharify", () => ({
  data: {
    HASHTAG_LAB_ADS_ALLOWLIST: "alloweduser@email.com,alloweduser2@email.com",
    CURRENT_USER: {
      type: "Non-Admin",
      email: "someuser@email.com",
    },
  },
}))

it("indexes and titles images", () => {
  const article = mount(
    <ArticleWithFullScreen article={StandardArticle} />
  ) as any
  expect(article.state("article").sections[4].images[0].setTitle).toBe(
    "A World Without Capitalism"
  )
  expect(article.state("article").sections[4].images[0].index).toBe(0)
  expect(article.state("article").sections[4].images[1].index).toBe(1)
  expect(article.state("article").sections[6].images[0].index).toBe(3)
  expect(article.state("article").sections[6].images[1].index).toBe(4)
})

it("renders articles in standard layout", () => {
  const article = mount(
    <ArticleWithFullScreen
      article={StandardArticle}
      display={Display("standard")}
      relatedArticlesForCanvas={RelatedCanvas}
      relatedArticlesForPanel={RelatedPanel}
    />
  )
  expect(article.find(StandardLayout).length).toBe(1)
  expect(article.find(RelatedArticlesPanel).length).toBe(1)
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})

it("renders articles in feature layout", () => {
  const article = mount(
    <ArticleWithFullScreen
      article={FeatureArticle}
      display={Display("slideshow")}
      relatedArticlesForCanvas={RelatedCanvas}
      relatedArticlesForPanel={RelatedPanel}
    />
  )
  expect(article.find(FeatureLayout).length).toBe(1)
  expect(article.find(RelatedArticlesPanel).length).toBe(0)
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})
