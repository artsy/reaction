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

describe("when ads are not enabled", () => {
  beforeEach(() => {
    props = {
      article: SeriesArticle,
      relatedArticles: [VideoArticle, StandardArticle],
    }
  })

  it("renders a series properly", () => {
    const series = renderComponent().toJSON()

    expect(series).toMatchSnapshot()
  })

  it("renders a sponsored series properly", () => {
    props.article = SeriesArticleSponsored

    const series = renderComponent().toJSON()

    expect(series).toMatchSnapshot()
  })

  it("does not render a DisplayAd", () => {
    const component = mountComponent()

    expect(component.find(DisplayAd).length).toBe(0)
  })
})

describe("when ads are enabled", () => {
  beforeEach(() => {
    props = {
      areHostedAdsEnabled: true,
      article: SeriesArticleFixture,
      isSeries: true,
    }
  })

  it("renders the series layout properly", () => {
    const layout = renderComponent().toJSON()
    expect(layout).toMatchSnapshot()
  })

  it("renders a DisplayAd", () => {
    const component = mountComponent()

    expect(component.find(DisplayAd).length).toBe(1)
  })
})
