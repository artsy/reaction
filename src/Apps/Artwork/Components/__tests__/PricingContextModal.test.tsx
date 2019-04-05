import { Button, QuestionCircleIcon } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { PricingContextModal } from "../PricingContextModal"

jest.unmock("react-relay")

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

    console.log(
      "BUTTON",
      component
        .find(Button)
        .at(0)
        .text()
    )

    expect(component.text()).not.toContain(
      "This information represents retail prices for works on Artsy"
    )
  })
})
