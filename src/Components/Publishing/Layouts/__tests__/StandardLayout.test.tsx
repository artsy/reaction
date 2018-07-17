import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { DisplayCanvas } from "../../Display/Canvas"
import { DisplayPanel } from "../../Display/DisplayPanel"
import { StandardArticle } from "../../Fixtures/Articles"
import { Display, RelatedCanvas, RelatedPanel } from "../../Fixtures/Components"
import { ReadMore } from "../../ReadMore/ReadMoreButton"
import { RelatedArticlesCanvas } from "../../RelatedArticles/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "../../RelatedArticles/RelatedArticlesPanel"
import { Sidebar } from "../Components/Sidebar"
import { StandardLayout } from "../StandardLayout"

jest.mock("../../Sections/FullscreenViewer/withFullScreen", () => ({
  withFullScreen: x => x,
}))

describe("Standard Article", () => {
  const getWrapper = props => {
    return mount(<StandardLayout {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: StandardArticle,
      display: Display("standard"),
      isTruncated: false,
      relatedArticlesForCanvas: RelatedCanvas,
      relatedArticlesForPanel: RelatedPanel,
    }
  })

  it("renders sidebar", () => {
    const article = getWrapper(props)
    expect(article.find(Sidebar).length).toBe(1)
  })

  it("renders related articles", () => {
    const article = getWrapper(props)
    expect(article.find(RelatedArticlesPanel).length).toBe(1)
    expect(article.find(RelatedArticlesCanvas).length).toBe(1)
  })

  it("renders display", () => {
    const article = getWrapper(props)
    expect(article.find(DisplayPanel).length).toBe(1)
    expect(article.find(DisplayCanvas).length).toBe(1)
  })

  it("shows read more if truncated", () => {
    props.isTruncated = true
    const article = getWrapper(props)
    expect(article.find(ReadMore).length).toBe(1)
  })

  it("Can remove truncation on click", () => {
    props.isTruncated = true
    const article = getWrapper(props)

    article
      .find(ReadMore)
      .at(0)
      .props()
      .onClick()
    expect(article.state().isTruncated).toBeFalsy()
  })
})
