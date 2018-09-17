import { mount } from "enzyme"
import React from "react"
import { Dismiss, ErrorModal, ModalButton } from "../ErrorModal"

describe("ErrorModal", () => {
  const getWrapper = inputs => {
    return mount(<ErrorModal {...inputs} />)
  }

  let props
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      blurContainerSelector: "",
    }
  })

  describe("ErrorModal content", () => {
    beforeEach(() => {
      props.show = true
    })

    it("Renders with default text if no props are specified", () => {
      const component = getWrapper(props)
      const text = component.text()
      expect(text).toContain("An error occurred")
      expect(text).toContain(
        "Something went wrong. Please try again or contact support@artsy.net."
      )
      expect(text).toContain("Continue")
    })

    it("Renders with a specified detailText", () => {
      props.detailText = "A custom error detail."
      const component = getWrapper(props)
      const text = component.text()
      expect(text).toContain("A custom error detail.")
      expect(text).not.toContain(
        "Something went wrong. Please try again or contact support@artsy.net."
      )
    })

    it("Renders with a specified props for header, detail, and the close button", () => {
      props.headerText = "Custom header"
      props.detailText = "A custom error detail."
      props.closeText = "OK"
      const component = getWrapper(props)
      const text = component.text()
      expect(text).toContain("Custom header")
      expect(text).toContain("A custom error detail.")
      expect(text).toContain("OK")
    })

    it("Clicking on the continue button closes the modal", () => {
      props.onClose = jest.fn()
      const component = getWrapper(props)
      component.find(ModalButton).simulate("click")
      expect(props.onClose).toBeCalled()
    })
  })
})
