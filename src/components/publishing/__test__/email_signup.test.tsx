import { mount } from "enzyme"
import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import request from "request"
import EmailSignup from "../email_signup"

jest.mock("request", () => {
  return { post: jest.fn() }
})

describe("EmailSignup", () => {
  it("renders an email signup", () => {
    const emailSignup = renderer.create(<EmailSignup signupUrl="#" />)
    expect(emailSignup).toMatchSnapshot()
  })

  it("submits an email", () => {
    const viewer = mount(<EmailSignup signupUrl="#" />)
    viewer.setState({ value: "foo@goo.net" })
    viewer.find("button").simulate("click")
    expect(request.post).toBeCalled()
    expect(request.post.mock.calls[0][0].email).toEqual("foo@goo.net")
  })
})
