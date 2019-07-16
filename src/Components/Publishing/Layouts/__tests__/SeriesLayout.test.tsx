import { DisplayAd } from "Components/Publishing/Display/DisplayAd"
import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
} from "Components/Publishing/Fixtures/Articles"
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
      isSeries: true,
    }
  })

  it("renders a series", () => {
    const seriesLayout = renderComponent().toJSON()

    expect(seriesLayout).toMatchSnapshot()
  })

  it("renders a sponsored series", () => {
    props.article = SeriesArticleSponsored

    const sponsoredSeries = renderComponent().toJSON()

    expect(sponsoredSeries).toMatchSnapshot()
  })

  it("renders a display ad when series", () => {
    const component = mountComponent()

    expect(component.find(DisplayAd).length).toBe(1)
  })
})
