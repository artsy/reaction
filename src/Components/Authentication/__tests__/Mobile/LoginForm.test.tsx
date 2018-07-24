import { mount } from "enzyme"
import React from "react"
import Input from "../../../Input"
import { MobileSubmitButton } from "../../commonElements"
import { MobileLoginForm } from "../../Mobile/LoginForm"

describe("MobileLoginForm", () => {
  const handleSubmit = jest.fn()
  const getWrapper = props =>
    mount(
      <MobileLoginForm
        values={props.values || {}}
        handleSubmit={handleSubmit}
        handleTypeChange={jest.fn()}
      />
    )

  it("renders the first step", () => {
    const wrapper = getWrapper({})
    const input = wrapper.find(Input)
    expect(input.length).toBe(1)
    expect(input.props().type).toEqual("email")
  })

  xit("renders errors", done => {
    const wrapper = getWrapper({})
    const button = wrapper.find("button")
    button.simulate("click")
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })
})
