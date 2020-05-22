import { RelatedCanvas } from "Components/Publishing/Fixtures/Components"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { RelatedArticleCanvasLink } from "../RelatedArticleCanvasLink"

jest.unmock("react-tracking")

describe("RelatedArticleCanvasLink", () => {
  const getWrapper = props => {
    return mount(<RelatedArticleCanvasLink {...props} />)
  }

  let testProps
  beforeEach(() => {
    testProps = { article: RelatedCanvas[0] }
  })

  it("renders expected data", () => {
    const component = getWrapper(testProps)

    expect(component.text()).toMatch(
      "The 15 Top Art Schools in the United States"
    )
    expect(component.text()).toMatch("Anna Louis-Sussman and Kana Abe")
    expect(component.text()).toMatch("May 19, 2017")
    expect(component.html()).toMatch("PoetterHall_Exterior%2Bcopy.jpg")
  })
})
