import { Button, QuestionCircleIcon } from "@artsy/palette"
import { mockTracking } from "Artsy/Analytics"
import { mount } from "enzyme"
import React from "react"
import { PricingContextModal } from "../PricingContextModal"

jest.unmock("react-relay")
jest.unmock("react-tracking")

describe("PricingContextModal", () => {
  it("renders with the modal closed", async () => {
    const component = mount(<PricingContextModal />)
    component.find(QuestionCircleIcon)

    expect(component.find(QuestionCircleIcon).length).toEqual(1)

    expect(component.text()).not.toContain(
      "This information represents retail prices for works on Artsy"
    )
  })
  it("opens the modal when the question mark icon is clicked", async () => {
    const component = mount(<PricingContextModal />)

    component
      .find(QuestionCircleIcon)
      .at(0)
      .simulate("click")
    expect(component.text()).toContain(
      "This information represents retail prices for works on Artsy"
    )
  })

  it("closes the modal when the 'Got it' button is clicked", async () => {
    const component = mount(<PricingContextModal />)
    component
      .find(QuestionCircleIcon)
      .at(0)
      .simulate("click")

    expect(component.text()).toContain(
      "This information represents retail prices for works on Artsy"
    )

    component
      .find(Button)
      .at(0)
      .simulate("click")

    // Wait for modal close animation to finish
    setTimeout(() => {
      expect(component.text()).not.toContain(
        "This information represents retail prices for works on Artsy"
      )
    }, 500)
  })

  describe("Analytics", () => {
    it("tracks clicks on the question mark icon", () => {
      const { Component, dispatch } = mockTracking(PricingContextModal)
      const component = mount(<Component />)
      component
        .find(QuestionCircleIcon)
        .at(0)
        .simulate("click")

      expect(dispatch).toBeCalledWith({
        context_module: "Price Context",
        action_type: "Click",
        subject: "Question Mark Informational Icon",
        flow: "Artwork Price Context",
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
