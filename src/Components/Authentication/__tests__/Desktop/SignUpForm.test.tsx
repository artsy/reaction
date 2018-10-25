import { SignUpForm } from "Components/Authentication/Desktop/SignUpForm"
import { mount } from "enzyme"
import { Formik } from "formik"
import React from "react"

describe("SignUpForm", () => {
  xit("calls handleSubmit with the right params", done => {
    const props = {
      handleSubmit: jest.fn(),
    }

    const values = {
      email: "foo@bar.com",
      password: "password123",
      name: "John Doe",
      acceptedTermsOfService: true,
    }

    const wrapper = mount(
      <SignUpForm values={values} handleSubmit={props.handleSubmit} />
    )

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

  it("renders errors", done => {
    const wrapper = mount(<SignUpForm handleSubmit={jest.fn()} />)
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
      <SignUpForm error="Some global server error" handleSubmit={jest.fn()} />
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

  it("renders spinner", done => {
    const values = {
      email: "foo@bar.com",
      password: "password123",
      name: "John Doe",
      acceptedTermsOfService: true,
    }
    const wrapper = mount(
      <SignUpForm handleSubmit={jest.fn()} values={values} />
    )

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
