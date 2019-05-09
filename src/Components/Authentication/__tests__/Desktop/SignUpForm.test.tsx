import { SignUpForm } from "Components/Authentication/Desktop/SignUpForm"
import { mount } from "enzyme"
import { Formik } from "formik"
import React from "react"

describe("SignUpForm", () => {
  let props

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
    }
  })

  const getWrapper = (passedProps = props) => {
    return mount(<SignUpForm {...passedProps} />)
  }

  xit("calls handleSubmit with the right params", done => {
    const values = {
      email: "foo@bar.com",
      password: "password123",
      name: "John Doe",
      acceptedTermsOfService: true,
    }
    props.values = values

    const wrapper = getWrapper()
    const formik = wrapper.find(Formik).instance() as any
    formik.submitForm()
    wrapper.update()

    setTimeout(() => {
      expect(props.handleSubmit).toBeCalledWith(
        values,
        formik.getFormikActions()
      )
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
    props.values = {
      email: "foo@bar.com",
      password: "password123",
      name: "John Doe",
      acceptedTermsOfService: true,
    }
    const wrapper = getWrapper()

    const input = wrapper.find(`Formik`)
    input.simulate("submit")
    wrapper.update()

    setTimeout(() => {
      const submitButton = wrapper.find(`SubmitButton`)
      expect((submitButton.props() as any).loading).toEqual(true)
      done()
    })
  })
})
