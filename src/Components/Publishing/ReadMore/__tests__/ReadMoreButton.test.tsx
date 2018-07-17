import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import Waypoint from "react-waypoint"
import { ReadMore, ReadMoreContainer } from "../ReadMoreButton"

describe("RelatedArticlesPanel", () => {
  const getWrapper = props => {
    return mount(<ReadMore {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      tracking: {
        trackEvent: jest.fn(),
      },
      onClick: jest.fn(),
    }
  })

  it("Calls onClick and tracking event on click", () => {
    const component = getWrapper(props)
    component
      .find(ReadMoreContainer)
      .at(0)
      .simulate("click")

    expect(props.onClick).toHaveBeenCalled()
    expect(props.tracking.trackEvent).toBeCalledWith({
      action: "Clicked read more",
    })
  })

  it("Calls a tracking impression", () => {
    const component = getWrapper(props)
    component
      .find(Waypoint)
      .getElement()
      .props.onEnter()
    const trackCall = props.tracking.trackEvent.mock.calls[0][0]

    expect(trackCall.action).toBe("article_impression")
    expect(trackCall.impression_type).toBe("Read more button")
  })
})
