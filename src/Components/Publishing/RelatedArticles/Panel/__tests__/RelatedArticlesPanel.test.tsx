import { RelatedPanel } from "Components/Publishing/Fixtures/Components"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { RelatedArticlesPanel } from "../RelatedArticlesPanel"
import { RelatedArticlesPanelLink } from "../RelatedArticlesPanelLink"

jest.unmock("react-tracking")

describe("RelatedArticlesPanel", () => {
  const getWrapper = props => {
    return mount(<RelatedArticlesPanel {...props} />)
  }

  let testProps
  beforeEach(() => {
    testProps = { articles: RelatedPanel }
  })

  it("renders the related articles panel", () => {
    const related = renderer
      .create(<RelatedArticlesPanel articles={RelatedPanel} />)
      .toJSON()
    expect(related).toMatchSnapshot()
  })

  it("renders a default label", () => {
    const component = getWrapper(testProps)
    expect(component.text()).toMatch("Related Stories")
  })

  it("renders a provided label", () => {
    testProps.label = "The Best Stories"
    const component = getWrapper(testProps)
    expect(component.text()).toMatch("The Best Stories")
  })

  it("renders links", () => {
    const component = getWrapper(testProps)
    expect(component.find(RelatedArticlesPanelLink)).toHaveLength(3)
  })
})
