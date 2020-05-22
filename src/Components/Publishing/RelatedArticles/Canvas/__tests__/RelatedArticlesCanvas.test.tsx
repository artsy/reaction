import { RelatedCanvas } from "Components/Publishing/Fixtures/Components"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { RelatedArticleCanvasLink } from "../RelatedArticleCanvasLink"
import { RelatedArticlesCanvas } from "../RelatedArticlesCanvas"

jest.unmock("react-tracking")

describe("RelatedArticlesCanvas", () => {
  const getWrapper = props => {
    return mount(<RelatedArticlesCanvas {...props} />)
  }

  let testProps
  beforeEach(() => {
    testProps = { articles: RelatedCanvas, vertical: { name: "Art Market" } }
  })

  it("renders the related articles canvas", () => {
    const related = renderer
      .create(<RelatedArticlesCanvas {...testProps} />)
      .toJSON()
    expect(related).toMatchSnapshot()
  })

  it("renders the vertical name if there is one", () => {
    const component = getWrapper(testProps)
    expect(component.text()).toMatch("Further reading in Art Market")
  })

  it("renders a default message if there is no vertical", () => {
    delete testProps.vertical
    const component = getWrapper(testProps)
    expect(component.html()).toMatch("More from Artsy Editorial")
  })

  it("renders article links", () => {
    const component = getWrapper(testProps)
    expect(component.find(RelatedArticleCanvasLink)).toHaveLength(4)
  })
})
