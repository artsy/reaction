import { ForgotPasswordForm } from "Components/Authentication/Desktop/ForgotPasswordForm"
import { mount, shallow } from "enzyme"
import React from "react"

jest.mock("sharify", () => ({ data: { RECAPTCHA_KEY: "recaptcha-api-key" } }))

describe("ForgotPasswordForm", () => {
  let props

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
      values: { email: "foo@bar.com" },
    }
    window.grecaptcha.execute.mockClear()
  })

  const getWrapper = (passedProps = props) => {
    return mount(<ForgotPasswordForm {...passedProps} />)
  }

  describe("onSubmit", () => {
    it("calls handleSubmit with expected params", done => {
      const wrapper = shallow(<ForgotPasswordForm {...props} />)
      const formik = wrapper.dive().instance() as any
      formik.submitForm()
      wrapper.update()

      setTimeout(() => {
        expect(props.handleSubmit).toBeCalledWith(
          {
            email: "foo@bar.com",
          },
          formik.getFormikActions()
        )
        done()
      })
    })

    it("fires reCAPTCHA event", done => {
      const wrapper = getWrapper()
      const input = wrapper.find(`Formik`)
      input.simulate("submit")

      setTimeout(() => {
        expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
          action: "forgot_submit",
        })
        done()
      })
    })
  })

  it("renders errors", done => {
    props.values = {}
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
})
