import { CollectionsRailContent } from "Components/CollectionsRail"
import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import { StandardArticle } from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  RelatedCanvas,
} from "Components/Publishing/Fixtures/Components"
import { RelatedArticlesCanvas } from "Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { CanvasFooter } from "../CanvasFooter"

jest.mock("sharify", () => ({
  data: {
    HASHTAG_LAB_ADS_ALLOWLIST: "alloweduser@email.com,alloweduser2@email.com",
    CURRENT_USER: {
      type: "Non-Admin",
      email: "someuser@email.com",
    },
  },
}))

describe("CanvasFooter", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<CanvasFooter {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: StandardArticle,
    }
  })

  it("renders related articles if provided", () => {
    props.relatedArticles = RelatedCanvas
    const component = getWrapper()

    expect(component.find(RelatedArticlesCanvas)).toHaveLength(1)
    expect(component.find(DisplayCanvas)).toHaveLength(0)
  })

  it("renders display if provided", () => {
    props.display = Display("image")
    const component = getWrapper()

    expect(component.find(DisplayCanvas)).toHaveLength(1)
    expect(component.find(RelatedArticlesCanvas)).toHaveLength(0)
  })

  it("renders display and related articles", () => {
    props.display = Display("image")
    props.relatedArticles = RelatedCanvas
    const component = getWrapper()

    expect(component.find(DisplayCanvas)).toHaveLength(1)
    expect(component.find(RelatedArticlesCanvas)).toHaveLength(1)
  })

  it("renders Collections Rail if props.showCollectionsRail", () => {
    props.showCollectionsRail = true
    const component = getWrapper()
    expect(component.find(CollectionsRailContent)).toHaveLength(1)
  })
})
