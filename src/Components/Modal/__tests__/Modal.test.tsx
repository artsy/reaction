import { mount } from "enzyme"
import React from "react"
import { Modal, ModalContainer, ModalOverlay } from "../Modal"

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
})
