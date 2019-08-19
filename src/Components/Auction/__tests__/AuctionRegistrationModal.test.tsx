import { Button, Checkbox, Modal } from "@artsy/palette"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { act } from "react-dom/test-utils"
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
    act(() => {
      wrapper.find(Checkbox).prop("onSelect")(true)
    })

    await flushPromiseQueue()
    wrapper.find(Button).simulate("click")
    expect(wrapper.text()).not.toMatch("You must agree to our terms.")
    expect(defaultProps.onSubmit).toHaveBeenCalled()
  })

  it("calls the onClose prop AFTER the modal show prop turns false", async () => {
    expect(wrapper.find(Modal).prop("show")).toEqual(true)

    defaultProps.onClose.mockImplementationOnce(() => {
      expect(wrapper.find(Modal).prop("show")).toEqual(false)
    })
    wrapper.find("CloseIcon").simulate("click")
    await flushPromiseQueue()
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
})
