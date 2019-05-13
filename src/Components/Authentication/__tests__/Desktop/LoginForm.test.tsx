import { LoginForm } from "Components/Authentication/Desktop/LoginForm"
import { mount, shallow } from "enzyme"
import React from "react"
import { LoginValues } from "../fixtures"

jest.mock("sharify", () => ({ data: { RECAPTCHA_KEY: "recaptcha-api-key" } }))

describe("LoginForm", () => {
  let props

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
    }
    window.grecaptcha.execute.mockClear()
  })

  const getWrapper = (passedProps = props) => {
    return mount(<LoginForm {...passedProps} />)
  }

  it("renders errors", done => {
    const wrapper = getWrapper()
    const input = wrapper.find(`input[name="email"]`)
    input.simulate("blur")
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
    props.values = LoginValues
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

  describe("onSubmit", () => {
    it("calls handleSubmit with expected params", done => {
      props.values = LoginValues
      const wrapper = shallow(<LoginForm {...props} />)
      const formik = wrapper.dive().instance() as any
      formik.submitForm()

      setTimeout(() => {
        expect(props.handleSubmit).toBeCalledWith(
          {
            email: "foo@bar.com",
            password: "password123",
          },
          formik.getFormikActions()
        )
        done()
      })
    })

    it("fires reCAPTCHA event", done => {
      props.values = LoginValues
      const wrapper = getWrapper()
      const input = wrapper.find(`Formik`)
      input.simulate("submit")

      setTimeout(() => {
        expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
          action: "login_submit",
        })
        done()
      })
    })
  })
})
