import { mount } from "enzyme"
import React from "react"
import Input from "../../../Input"
import { MobileForgotPasswordForm } from "../../Mobile/ForgotPasswordForm"

describe("MobileLoginForm", () => {
  const handleSubmit = jest.fn()
  const getWrapper = props =>
    mount(
      <MobileForgotPasswordForm
        values={props.values || {}}
        handleSubmit={handleSubmit}
        handleTypeChange={jest.fn()}
      />
    )

  it("renders the email input", () => {
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

  it("submits", done => {
    const wrapper = getWrapper({ values: { email: "kana@lalamail.com" } })
    const button = wrapper.find("button")
    button.simulate("submit")
    wrapper.update()
    setTimeout(() => {
      expect(handleSubmit.mock.calls[0][0].email).toBe("kana@lalamail.com")
      done()
    })
  })
})
