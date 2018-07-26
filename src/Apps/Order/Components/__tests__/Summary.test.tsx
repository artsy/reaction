import { mount } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"
import { Summary } from "../Summary"

describe("Order summary", () => {
  it("renders the summary properly", () => {
    const summary = renderer.create(<Summary />).toJSON()
    expect(summary).toMatchSnapshot()
  })

  it("handles FAQ modal", () => {
    const mediatorMock = {
      trigger: jest.fn(),
    }
    const summary = mount(<Summary mediator={mediatorMock} />)

    summary
      .find("a")
      .at(0)
      .simulate("click")

    expect(mediatorMock.trigger).toHaveBeenCalledWith("openOrdersBuyerFAQModal")
  })

  it("handles contact specialist modal", () => {
    const mediatorMock = {
      trigger: jest.fn(),
    }
    const summary = mount(<Summary mediator={mediatorMock} />)

    summary
      .find("a")
      .at(1)
      .simulate("click")

    expect(mediatorMock.trigger).toHaveBeenCalledWith(
      "openOrdersContactArtsyModal"
    )
  })
})
