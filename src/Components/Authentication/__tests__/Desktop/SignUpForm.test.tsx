import { mount, shallow } from "enzyme"
import React from "react"
import { SignUpForm } from "../../Desktop/SignUpForm"

describe("SignUpForm", () => {
  it("calls handleSubmit with the right params", done => {
    const props = {
      handleSubmit: jest.fn(),
    }

    const values = {
      email: "foo@bar.com",
      password: "password123",
      name: "John Doe",
      acceptedTermsOfService: true,
    }

    const wrapper = shallow(
      <SignUpForm values={values} handleSubmit={props.handleSubmit} />
    )

    const formik = wrapper.dive().instance() as any
    formik.submitForm()

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
})
