import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { StandardArticle } from "../../Fixtures/Articles"
import { Display, RelatedCanvas, RelatedPanel } from "../../Fixtures/Components"
import { RelatedArticlesCanvas } from "../../RelatedArticles/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "../../RelatedArticles/RelatedArticlesPanel"
import { StandardLayout } from "../StandardLayout"

jest.mock("../../Sections/FullscreenViewer/withFullScreen", () => ({
  withFullScreen: x => x,
}))

it("renders related articles in standard layout", () => {
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
