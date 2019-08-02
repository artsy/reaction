import { Modal } from "@artsy/palette"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"

import { Button } from "@artsy/palette"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
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
  beforeEach(async () => {
    wrapper = mount(<AuctionRegistrationModal {...defaultProps} />)
    jest.restoreAllMocks()
    // We need to await the promises to let this wrapper render
    await flushPromiseQueue()
    wrapper.update()
  })

  it("renders a Modal with the sale name", async done => {
    expect(wrapper.find(Modal).text()).toMatch("Register for Big Sale")
    done()
  })

  it("adds an error when trying to submit without accepting terms", async () => {
    wrapper.find(Button).simulate("click")
    await flushPromiseQueue()
    expect(wrapper.text()).toMatch("You must agree to our terms.")
  })

  it("calls the onSubmit prop when trying to submit after accepting terms", async () => {
    wrapper
      .find('input[type="checkbox"]')
      .simulate("change", { target: { checked: true } })
    await flushPromiseQueue()
    wrapper.find(Button).simulate("click")
    expect(wrapper.text()).not.toMatch("You must agree to our terms.")
    expect(defaultProps.onSubmit).toHaveBeenCalled()
  })

  it("calls the onClose prop when the modal closes", async () => {
    wrapper.find("CloseIcon").simulate("click")
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
})
