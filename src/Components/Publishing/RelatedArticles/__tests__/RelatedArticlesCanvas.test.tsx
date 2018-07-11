import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import Waypoint from "react-waypoint"
import { RelatedCanvas } from "../../Fixtures/Components"
import { RelatedArticlesCanvas } from "../RelatedArticlesCanvas"

describe("RelatedArticlesCanvas", () => {
  const getWrapper = props => {
    return mount(<RelatedArticlesCanvas {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      articles: RelatedCanvas,
      vertical: { name: "Art Market" },
      tracking: {
        trackEvent: jest.fn(),
      },
    }
  })

  it("renders the related articles canvas", () => {
    const related = renderer
      .create(<RelatedArticlesCanvas {...props} />)
      .toJSON()
    expect(related).toMatchSnapshot()
  })

  it("renders the vertical name if there is one", () => {
    const component = getWrapper(props)
    expect(component.html()).toMatch("Art Market")
  })

  it("renders a default message if there is no vertical", () => {
    delete props.vertical
    const component = getWrapper(props)
    expect(component.html()).toMatch("More from Artsy Editorial")
  })

  it("Calls a tracking impression", () => {
    const component = getWrapper(props)
    component
      .find(Waypoint)
      .getElement()
      .props.onEnter()
    const trackCall = props.tracking.trackEvent.mock.calls[0][0]

    expect(trackCall.action).toBe("article_impression")
    expect(trackCall.impression_type).toBe("Further reading")
  })
})
