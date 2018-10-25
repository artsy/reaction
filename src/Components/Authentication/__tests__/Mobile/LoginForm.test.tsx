import { MobileLoginForm } from "Components/Authentication/Mobile/LoginForm"
import Input from "Components/Input"
import { mount } from "enzyme"
import React from "react"

describe("MobileLoginForm", () => {
  const handleSubmit = jest.fn()
  const getWrapper = props =>
    mount(
      <MobileLoginForm
        {...props}
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

  it("renders email errors", done => {
    const wrapper = getWrapper({ values: { email: "kanalala" } })
    const button = wrapper.find("button")
    button.simulate("submit")
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  it("renders password error", () => {
    const wrapper = getWrapper({ values: { email: "kajsdlfjk" } })
    const formik: any = wrapper.find("Formik").instance()
    formik.setStatus({ error: "some password error" })
    wrapper.update()
    expect(wrapper.html()).toMatch("some password error")
  })

  it("renders global errors", () => {
    const wrapper = mount(
      <MobileLoginForm
        error="Some global server error"
        handleSubmit={jest.fn()}
      />
    )
    wrapper.update()
    expect(wrapper.html()).toMatch("Some global server error")
  })

  // TODO: Luc, this test needs finishing.
  xit("calls onBackButtonClicked if back button is clicked on first page", () => {
    const onBackButtonClicked = jest.fn()
    mount(
      <MobileLoginForm
        values={{}}
        handleSubmit={handleSubmit}
        handleTypeChange={jest.fn()}
        onBackButtonClicked={onBackButtonClicked}
      />
    )
  })
})
