import { ForgotPasswordForm } from "Components/Authentication/Desktop/ForgotPasswordForm"
import { mount, shallow } from "enzyme"
import React from "react"

describe("ResetPasswordForm", () => {
  xit("calls handleSubmit with the right params", () => {
    const props = {
      handleSubmit: jest.fn(),
    }

    const values = {
      email: "foo@bar.com",
    }

    const wrapper = shallow(
      <ForgotPasswordForm values={values} handleSubmit={props.handleSubmit} />
    )

    const formik = wrapper.dive().instance() as any
    formik.submitForm()

    setTimeout(() => {
      expect(props.handleSubmit).toBeCalledWith(
        {
          email: "foo@bar.com",
        },
        formik.getFormikActions()
      )
    })
  })

  it("renders errors", done => {
    const wrapper = mount(<ForgotPasswordForm handleSubmit={jest.fn()} />)
    const button = wrapper.find(`input[name="email"]`)
    button.simulate("blur")
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  it("clears error after input change", done => {
    const wrapper = mount(
      <ForgotPasswordForm
        error="Some global server error"
        handleSubmit={jest.fn()}
      />
    )
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
