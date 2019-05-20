import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import { DisplayPanel } from "Components/Publishing/Display/DisplayPanel"
import { NewDisplayCanvas } from "Components/Publishing/Display/NewDisplayCanvas"
import { NewDisplayPanel } from "Components/Publishing/Display/NewDisplayPanel"
import { StandardArticle } from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  RelatedCanvas,
  RelatedPanel,
} from "Components/Publishing/Fixtures/Components"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { StandardLayout } from "../StandardLayout"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("Standard Article with new ads hidden behind feature flags", () => {
  const getWrapper = _props => {
    return mount(<StandardLayout {..._props} />)
  }

  let standardArticleProps
  beforeEach(() => {
    standardArticleProps = {
      article: StandardArticle,
      display: Display("standard"),
      isTruncated: false,
      relatedArticlesForCanvas: RelatedCanvas,
      relatedArticlesForPanel: RelatedPanel,
      areHostedAdsEnabled: true,
    }
  })

  it("It renders new panel and canvas displays in Standard Layout Articles when feature flagged ads are enabled", () => {
    const article = getWrapper(standardArticleProps)

    expect(article.find(NewDisplayPanel).length).toBe(1)
    expect(article.find(NewDisplayCanvas).length).toBe(1)
    expect(article.find(DisplayPanel).length).toBe(0)
    expect(article.find(DisplayCanvas).length).toBe(0)
  })
})
