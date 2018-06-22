import { mount, shallow } from "enzyme"
import React from "react"
import { LoginForm } from "../../Desktop/LoginForm"

describe("LoginForm", () => {
  it("calls handleSubmit with the right params", () => {
    const props = {
      handleSubmit: jest.fn(),
    }

    const values = {
      email: "foo@bar.com",
      password: "password123",
    }

    const wrapper = shallow(
      <LoginForm values={values} handleSubmit={props.handleSubmit} />
    )

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
    })
  })

  it("renders errors", done => {
    const wrapper = mount(<LoginForm handleSubmit={jest.fn()} />)
    const button = wrapper.find(`input[name="email"]`)
    button.simulate("blur")
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })
})
