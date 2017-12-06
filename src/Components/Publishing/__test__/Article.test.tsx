import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Article } from "../Article"
import { FeatureArticle, StandardArticle } from "../Fixtures/Articles"
import { Display, RelatedCanvas, RelatedPanel } from "../Fixtures/Components"
import { RelatedArticlesCanvas } from "../RelatedArticles/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "../RelatedArticles/RelatedArticlesPanel"

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})
jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("react-tracking", () => jest.fn(c => d => d))

it("indexes and titles images", () => {
  const article = mount(<Article article={StandardArticle} />)
  expect(article.state("article").sections[4].images[0].setTitle).toBe("A World Without Capitalism")
  expect(article.state("article").sections[4].images[0].index).toBe(0)
  expect(article.state("article").sections[4].images[1].index).toBe(1)
  expect(article.state("article").sections[6].images[0].index).toBe(3)
  expect(article.state("article").sections[6].images[1].index).toBe(4)
})

it("renders related articles in standard layout", () => {
  const article = mount(
    <Article
      article={StandardArticle}
      display={Display("standard")}
      relatedArticlesForCanvas={RelatedCanvas}
      relatedArticlesForPanel={RelatedPanel}
    />
  )
  expect(article.find(RelatedArticlesPanel).length).toBe(1)
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})

it("renders RelatedArticlesCanvas in feature layout", () => {
  const article = mount(
    <Article
      article={FeatureArticle}
      display={Display("slideshow")}
      relatedArticlesForCanvas={RelatedCanvas}
      relatedArticlesForPanel={RelatedPanel}
    />
  )
  expect(article.find(RelatedArticlesPanel).length).toBe(0)
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})
