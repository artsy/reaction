import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"

import { Button } from "@artsy/palette"
import { CloseButton } from "Components/Modal/Modal"
import { AuctionRegistrationModal } from "../AuctionRegistrationModal"

const submitMock = jest.fn()
const closeMock = jest.fn()
const defaultProps = {
  onSubmit: submitMock,
  onClose: closeMock,
  auction: { name: "Big Sale", id: 1 },
}

describe("AuctionRegistrationModal", () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<AuctionRegistrationModal {...defaultProps} />)
    jest.restoreAllMocks()
  })

  xit("matches snapshot (TODO: Try to reenable with new palette modal)", () => {
    const modal = renderer
      .create(<AuctionRegistrationModal {...defaultProps} />)
      .toJSON()
    expect(modal).toMatchSnapshot()
  })

  it("renders a Modal with the sale name", () => {
    expect(wrapper.text()).toMatch("Register for Big Sale")
  })

  it("adds an error when trying to submit without accepting terms", () => {
    wrapper.find(Button).simulate("click")
    expect(wrapper.text()).toMatch("You must agree to our terms.")
  })

  it("calls the onSubmit prop when trying to submit after accepting terms", () => {
    wrapper
      .find('input[type="checkbox"]')
      .simulate("change", { target: { checked: true } })
    wrapper.find(Button).simulate("click")
    expect(wrapper.text()).not.toMatch("You must agree to our terms.")
    expect(defaultProps.onSubmit).toHaveBeenCalled()
  })

  it("calls the onClose prop when the modal closes", () => {
    wrapper.find(CloseButton).simulate("click")
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
})
