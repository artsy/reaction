import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { StandardArticle } from "../../Fixtures/Articles"
import { Display, RelatedCanvas, RelatedPanel } from "../../Fixtures/Components"
import { DisplayCanvas } from "../../Display/Canvas"
import { DisplayPanel } from "../../Display/DisplayPanel"
import { ReadMore } from "../../ReadMore/ReadMoreButton"
import { RelatedArticlesCanvas } from "../../RelatedArticles/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "../../RelatedArticles/RelatedArticlesPanel"
import { StandardLayout } from "../StandardLayout"
import { Sidebar } from "../Components/Sidebar"

jest.mock("../../Sections/FullscreenViewer/withFullScreen", () => ({
  withFullScreen: x => x,
}))

it("renders sidebar", () => {
  const article = mount(
    <StandardLayout
      article={StandardArticle}
      display={Display("standard")}
      relatedArticlesForCanvas={RelatedCanvas}
      relatedArticlesForPanel={RelatedPanel}
    />
  )
  expect(article.find(Sidebar).length).toBe(1)
})

it("renders related articles", () => {
  const article = mount(
    <StandardLayout
      article={StandardArticle}
      display={Display("standard")}
      relatedArticlesForCanvas={RelatedCanvas}
      relatedArticlesForPanel={RelatedPanel}
    />
  )
  expect(article.find(RelatedArticlesPanel).length).toBe(1)
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})

it("renders display", () => {
  const article = mount(
    <StandardLayout
      article={StandardArticle}
      display={Display("standard")}
      relatedArticlesForCanvas={RelatedCanvas}
      relatedArticlesForPanel={RelatedPanel}
    />
  )
  expect(article.find(DisplayPanel).length).toBe(1)
  expect(article.find(DisplayCanvas).length).toBe(1)
})

it("shows read more if truncated", () => {
  const article = mount(
    <StandardLayout
      article={StandardArticle}
      display={Display("standard")}
      relatedArticlesForCanvas={RelatedCanvas}
      relatedArticlesForPanel={RelatedPanel}
      isTruncated
    />
  )
  expect(article.find(ReadMore).length).toBe(1)
})

it("Can remove truncation on click", () => {
  const article = mount(
    <StandardLayout
      article={StandardArticle}
      display={Display("standard")}
      relatedArticlesForCanvas={RelatedCanvas}
      relatedArticlesForPanel={RelatedPanel}
      isTruncated
    />
  )
  article
    .find(ReadMore)
    .at(0)
    .props()
    .onClick()
  expect(article.state().isTruncated).toBeFalsy()
})
