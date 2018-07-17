import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { RelatedCanvas } from "../../Fixtures/Components"
import { RelatedArticleFigure } from "../RelatedArticleFigure"

describe("RelatedArticlesCanvas", () => {
  const getWrapper = props => {
    return mount(<RelatedArticleFigure {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: RelatedCanvas[0],
      tracking: {
        trackEvent: jest.fn(),
      },
    }
  })

  it("renders expected data", () => {
    const component = getWrapper(props)

    expect(component.text()).toMatch(
      "The 15 Top Art Schools in the United States"
    )
    expect(component.text()).toMatch("Anna Louis-Sussman and Kana Abe")
    expect(component.text()).toMatch("May 19, 2017")
    expect(component.html()).toMatch("PoetterHall_Exterior%2Bcopy.jpg")
  })

  it("Tracks link clicks", () => {
    const component = getWrapper(props)
    component.simulate("click")
    const trackCall = props.tracking.trackEvent.mock.calls[0][0]

    expect(trackCall.action).toBe("Clicked article impression")
    expect(trackCall.destination_path).toBe(
      "/article/artsy-editorial-15-top-art-schools-united-states"
    )
    expect(trackCall.entity_id).toBe("52d99185cd530e581300006c")
    expect(trackCall.entity_type).toBe("article")
    expect(trackCall.flow).toBe("article")
    expect(trackCall.impression_type).toBe("Further reading")
    expect(trackCall.type).toBe("thumbnail")
  })
})
