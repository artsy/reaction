import { mount } from "enzyme"
import React from "react"
import Input from "../../../Input"
import { BackButton, SubmitButton } from "../../commonElements"
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

  it("renders errors", done => {
    const wrapper = getWrapper({ values: { email: "kanalala" } })
    const button = wrapper.find("button")
    button.simulate("submit")
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  it("calls onBackButtonClicked if back button is clicked on first page", () => {
    const onBackButtonClicked = jest.fn()
    const wrapper = mount(
      <MobileLoginForm
        values={{}}
        handleSubmit={handleSubmit}
        handleTypeChange={jest.fn()}
        onBackButtonClicked={onBackButtonClicked}
      />
    )
  })
})
