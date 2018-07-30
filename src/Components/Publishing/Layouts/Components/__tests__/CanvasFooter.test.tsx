import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { DisplayCanvas } from "../../../Display/Canvas"
import { StandardArticle } from "../../../Fixtures/Articles"
import { Display, RelatedCanvas } from "../../../Fixtures/Components"
import RelatedArticlesCanvas from "../../../RelatedArticles/RelatedArticlesCanvas"
import { CanvasFooter } from "../CanvasFooter"

describe("CanvasFooter", () => {
  const getWrapper = props => {
    return mount(<CanvasFooter {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: StandardArticle,
    }
  })

  it("renders related articles if provided", () => {
    props.relatedArticles = RelatedCanvas
    const component = getWrapper(props)

    expect(component.find(RelatedArticlesCanvas)).toHaveLength(1)
    expect(component.find(DisplayCanvas)).toHaveLength(0)
  })

  it("renders display if provided", () => {
    props.display = Display("image")
    const component = getWrapper(props)

    expect(component.find(DisplayCanvas)).toHaveLength(1)
    expect(component.find(RelatedArticlesCanvas)).toHaveLength(0)
  })

  it("renders display and related articles", () => {
    props.relatedArticles = RelatedCanvas
    const component = getWrapper(props)

    expect(component.find(DisplayCanvas)).toHaveLength(0)
    expect(component.find(RelatedArticlesCanvas)).toHaveLength(1)
  })
})
