import { mount } from "enzyme"
import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import EmailSignup from "../email_signup"

describe("EmailSignup", () => {
  it("renders an email signup", () => {
    const emailSignup = renderer.create(<EmailSignup signupUrl="#" />)
    expect(emailSignup).toMatchSnapshot()
  })

  it("submits an email", () => {
    const post = jest.fn()
    EmailSignup.__Rewire__("request", { post })
    const viewer = mount(<EmailSignup signupUrl="#" />)
    viewer.setState({ value: "foo@goo.net" })
    viewer.find("button").simulate("click")
    expect(post).toBeCalled()
    expect(post.mock.calls[0][0].email).toEqual("foo@goo.net")
  })
})
