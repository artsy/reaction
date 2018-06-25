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
    const wrapper = mount(<LoginForm />)
    const input = wrapper.find(`input[name="email"]`)
    input.simulate("blur")
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  it("clears error after input change", done => {
    const wrapper = mount(<LoginForm error="Some global server error" />)
    const input = wrapper.find(`input[name="email"]`)
    expect(wrapper.state().error).toEqual("Some global server error")
    input.simulate("change")
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.state().error).toEqual(null)
      done()
    })
  })
})
