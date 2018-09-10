import { Sans } from "@artsy/palette"
import { shallow } from "enzyme"
import React from "react"
import { CreditCardInput, StyledCardElement } from "../CreditCardInput"

describe("CreditCardInput", () => {
  it("does not show an error message when onChange is fired with undefined response", () => {
    const creditCardInput = shallow(<CreditCardInput />)

    // We test this because the <CardElement> component invokes the onChange()
    // callback with no error when there is no validation error in the CC info
    // and this case is very easy to forget to test.
    creditCardInput
      .find(StyledCardElement)
      .simulate("change", { complete: false, empty: false, error: undefined })

    expect(creditCardInput.find(Sans).length).toEqual(0)
  })

  it("shows an error message when error.message prop is present", () => {
    const creditCardInput = shallow(
      <CreditCardInput error={{ message: "Card number is invalid" } as any} />
    )

    expect(creditCardInput.find(Sans).html()).toMatch("Card number is invalid")
  })

  it("shows an error message from state", () => {
    const creditCardInput = shallow(
      <CreditCardInput error={{ message: "Card number is invalid" }} />
    )

    creditCardInput
      .find(StyledCardElement)
      .simulate("change", { error: { message: "Service unavailable" } })

    expect(creditCardInput.find(Sans).html()).toMatch("Service unavailable")
  })

  it("shows an error message from state even when error.message prop is present", () => {
    const creditCardInput = shallow(<CreditCardInput />)

    creditCardInput
      .find(StyledCardElement)
      .simulate("change", { error: { message: "Service unavailable" } })

    expect(creditCardInput.find(Sans).html()).toMatch("Service unavailable")
  })
})
