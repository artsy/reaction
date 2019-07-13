import { DisplayAd } from "Components/Publishing/Display/DisplayAd"
import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
} from "Components/Publishing/Fixtures/Articles"
import { SeriesArticle as SeriesArticleFixture } from "Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesLayout } from "../SeriesLayout"

let props
function renderComponent() {
  return renderer.create(<SeriesLayout {...props} />)
}
function mountComponent() {
  return mount(<SeriesLayout {...props} />)
}

describe("series layout", () => {
  beforeEach(() => {
    props = {
      article: SeriesArticle,
      relatedArticles: [VideoArticle, StandardArticle],
    }
  })

  it("renders a series", () => {
    const series = renderComponent().toJSON()

    expect(series).toMatchSnapshot()
  })

  it("renders a sponsored series", () => {
    props.article = SeriesArticleSponsored

    const series = renderComponent().toJSON()

    expect(series).toMatchSnapshot()
  })
})

describe("series layout with ads", () => {
  beforeEach(() => {
    props = {
      article: SeriesArticleFixture,
      isSeries: true,
    }
  })

  it("renders the series layout with ads", () => {
    const layout = renderComponent().toJSON()
    expect(layout).toMatchSnapshot()
  })

  it("renders a display ad", () => {
    const component = mountComponent()

    expect(component.find(DisplayAd).length).toBe(1)
  })
})
