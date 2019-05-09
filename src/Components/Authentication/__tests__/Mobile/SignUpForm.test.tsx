import { MobileSignUpForm } from "Components/Authentication/Mobile/SignUpForm"
import QuickInput from "Components/QuickInput"
import { mount } from "enzyme"
import React from "react"

describe("MobileSignUpForm", () => {
  let props

  const getWrapper = (passedProps = props) => {
    return mount(<MobileSignUpForm {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      values: {},
      handleSubmit: jest.fn(),
      handleTypeChange: jest.fn(),
    }
  })

  it("renders the first step", () => {
    const wrapper = getWrapper()
    const input = wrapper.find(QuickInput)
    expect(input.length).toBe(1)
    expect(input.props().type).toEqual("email")
    expect(wrapper.text()).toContain("Sign up for Artsy")
  })

  it("renders captcha disclaimer if showRecaptchaDisclaimer", () => {
    props.showRecaptchaDisclaimer = true
    const wrapper = getWrapper()
    expect(wrapper.text()).toMatch(
      "This site is protected by reCAPTCHA and the Google Privacy Policy Terms of Service apply."
    )
  })

  it("renders errors", done => {
    const wrapper = getWrapper()
    const button = wrapper.find("button")
    button.simulate("submit")
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  it("renders password error", () => {
    props.values = { email: "kajsdlfjk" }
    const wrapper = getWrapper()
    const formik: any = wrapper.find("Formik").instance()
    formik.setStatus({ error: "some password error" })
    wrapper.update()
    expect(wrapper.html()).toMatch("some password error")
  })

  it("renders the specified title", () => {
    props.title = "Sign up to follow Andy Warhol"
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("Sign up to follow Andy Warhol")
  })

  it("renders global errors", () => {
    props.error = "Some global server error"
    const wrapper = getWrapper()
    wrapper.update()
    expect(wrapper.html()).toMatch("Some global server error")
  })
})
