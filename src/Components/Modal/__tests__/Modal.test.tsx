import Icon from "Components/Icon"
import { mount } from "enzyme"
import React from "react"
import { Modal, ModalContainer, ModalOverlay } from "../Modal"
import { ModalCta } from "../ModalCta"
import { ModalHeader } from "../ModalHeader"

describe("Modal", () => {
  const getWrapper = props => {
    return mount(
      <Modal {...props}>
        <div>Modal Contents</div>
      </Modal>
    )
  }

  let props
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      blurContainerSelector: "",
    }
  })

  it("does not render children by default", () => {
    const component = getWrapper(props)
    expect(component.html()).not.toMatch("Modal Contents")
  })

  it("Renders children if props.show", () => {
    props.show = true
    const component = getWrapper(props)

    expect(component.find(ModalContainer)).toHaveLength(1)
    expect(component.find(ModalOverlay)).toHaveLength(1)
    expect(component.html()).toMatch("Modal Contents")
  })

  it("Closes on background click", () => {
    props.show = true
    const component = getWrapper(props)
    component.instance().removeBlurToContainers = jest.fn()
    component
      .find(ModalOverlay)
      .at(0)
      .simulate("click")

    expect(component.instance().removeBlurToContainers).toHaveBeenCalled()
    expect(props.onClose).toHaveBeenCalled()
  })

  it("Closes on x-button click", () => {
    props.show = true
    const component = getWrapper(props)
    component.instance().removeBlurToContainers = jest.fn()
    component
      .find(Icon)
      .at(0)
      .simulate("click")

    expect(component.instance().removeBlurToContainers).toHaveBeenCalled()
    expect(props.onClose).toHaveBeenCalled()
  })

  describe("Modal content", () => {
    beforeEach(() => {
      props.show = true
    })

    it("Renders ModalHeader if props.title", () => {
      props.title = "Log In"
      const component = getWrapper(props)

      expect(component.find(ModalHeader)).toHaveLength(1)
      expect(component.html()).toMatch("Log In")
    })

    it("Renders ModalHeader if props.hasLogo", () => {
      props.hasLogo = true
      const component = getWrapper(props)

      expect(component.find(ModalHeader)).toHaveLength(1)
      expect(component.find(Icon)).toHaveLength(2)
    })

    it("Renders ModalCta if props.cta", () => {
      props.cta = {
        text: "Learn More",
        onClick: jest.fn(),
      }
      const component = getWrapper(props)

      expect(component.find(ModalCta)).toHaveLength(1)
      expect(component.html()).toMatch("Learn More")
    })
  })
})
