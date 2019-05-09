import { SignUpForm } from "Components/Authentication/Desktop/SignUpForm"
import { mount, shallow } from "enzyme"
import { Formik } from "formik"
import React from "react"
import { SignupValues } from "../fixtures"

jest.mock("sharify", () => ({
  data: { RECAPTCHA_KEY: "recaptcha-api-key" },
}))

describe("SignUpForm", () => {
  let props

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
    }
    window.grecaptcha.ready.mockClear()
    window.grecaptcha.execute.mockClear()
  })

  const getWrapper = (passedProps = props) => {
    return mount(<SignUpForm {...passedProps} />)
  }

  it("calls handleSubmit with the right params", done => {
    props.values = SignupValues
    const wrapper = shallow(<SignUpForm {...props} />)
    const formik = wrapper.dive().instance() as any
    formik.submitForm()

    setTimeout(() => {
      expect(props.handleSubmit).toBeCalledWith(
        {
          email: "foo@bar.com",
          password: "password123",
          name: "John Doe",
          accepted_terms_of_service: true,
        },
        formik.getFormikActions()
      )
      done()
    })
  })

  it("fires reCAPTCHA event on submit", done => {
    props.values = SignupValues
    const wrapper = shallow(<SignUpForm {...props} />)
    const formik = wrapper.dive().instance() as any
    formik.submitForm()

    setTimeout(() => {
      expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
        action: "signup_submit",
      })
      done()
    })
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
    const button = wrapper.find(`input[name="email"]`)
    button.simulate("blur")
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  it("clears error after input change", done => {
    props.error = "Some global server error"
    const wrapper = getWrapper()
    const input = wrapper.find(`input[name="email"]`)
    expect((wrapper.state() as any).error).toEqual("Some global server error")
    input.simulate("change")
    wrapper.update()
    setTimeout(() => {
      expect((wrapper.state() as any).error).toEqual(null)
      done()
    })
  })

  it("renders spinner", done => {
    props.values = SignupValues
    const wrapper = getWrapper()
    const input = wrapper.find(Formik)
    input.simulate("submit")
    wrapper.update()

    setTimeout(() => {
      const submitButton = wrapper.find(`SubmitButton`)
      expect((submitButton.props() as any).loading).toEqual(true)
      done()
    })
  })
})
