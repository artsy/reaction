import {
  BackButton,
  SubmitButton,
} from "Components/Authentication/commonElements"
import { MobileLoginForm } from "Components/Authentication/Mobile/LoginForm"
import QuickInput from "Components/QuickInput"
import { mount } from "enzyme"
import React from "react"
import { ChangeEvents } from "../fixtures"

jest.mock("sharify", () => ({
  data: { RECAPTCHA_KEY: "recaptcha-api-key" },
}))

jest.mock("Components/Authentication/helpers", () => ({
  checkEmail: jest.fn().mockResolvedValue(true),
}))

describe("MobileLoginForm", () => {
  let props

  beforeEach(() => {
    props = {
      values: {},
      handleSubmit: jest.fn(),
      handleTypeChange: jest.fn(),
    }
    window.grecaptcha.execute.mockClear()
  })

  const getWrapper = (passedProps = props) => {
    return mount(<MobileLoginForm {...passedProps} />)
  }

  it("renders the first step", () => {
    const wrapper = getWrapper()
    const input = wrapper.find(QuickInput)
    expect(input.length).toBe(1)
    expect(input.props().type).toEqual("email")
  })

  it("renders email errors", done => {
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
    const wrapper = getWrapper()
    const formik: any = wrapper.find("Formik").instance()
    formik.setStatus({ error: "some password error" })
    wrapper.update()
    expect(wrapper.html()).toMatch("some password error")
  })

  it("renders global errors", () => {
    props.error = "Some global server error"
    const wrapper = getWrapper()
    wrapper.update()
    expect(wrapper.html()).toMatch("Some global server error")
  })

  it("calls onBackButtonClicked if back button is clicked on first page", () => {
    props.onBackButtonClicked = jest.fn()
    const wrapper = getWrapper()
    wrapper.find(BackButton).simulate("click")
    expect(props.onBackButtonClicked).toBeCalled()
  })

  describe("onSubmit", () => {
    it("calls handleSubmit with expected params", done => {
      const wrapper = getWrapper()
      const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
      inputEmail.onChange(ChangeEvents.email)
      wrapper.find(SubmitButton).simulate("click")

      setTimeout(() => {
        wrapper.update()
        const inputPass = wrapper.find(QuickInput).instance() as QuickInput
        inputPass.onChange(ChangeEvents.password)
        wrapper.find(SubmitButton).simulate("click")

        setTimeout(() => {
          expect(props.handleSubmit.mock.calls[0][0]).toEqual({
            email: "email@email.com",
            password: "password",
          })
          done()
        })
      })
    })

    it("fires reCAPTCHA event", done => {
      const wrapper = getWrapper()
      const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
      inputEmail.onChange(ChangeEvents.email)
      wrapper.find(SubmitButton).simulate("click")

      setTimeout(() => {
        wrapper.update()
        const inputPass = wrapper.find(QuickInput).instance() as QuickInput
        inputPass.onChange(ChangeEvents.password)
        wrapper.find(SubmitButton).simulate("click")

        setTimeout(() => {
          expect(window.grecaptcha.execute).toBeCalledWith(
            "recaptcha-api-key",
            {
              action: "login_submit",
            }
          )
          done()
        })
      })
    })
  })
})
