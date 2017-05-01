import { shallow } from "enzyme"
import * as fetchMock from "fetch-mock"
import * as React from "react"
import * as TestUtils from "react-dom/test-utils"
import * as renderer from "react-test-renderer"

import Button from "../../../../../components/buttons/inverted"
import Message from "../../../../../components/message"
import ForgotPassword from "../index"

describe("<ForgotPassword />", () => {
  const APP_TOKEN = "force-staging"
  const SUBMIT_URL = "https://stagingapi.artsy.net/api/v1/users/send_reset_password_instructions"

  afterEach(() => {
    fetchMock.restore()
  })

  it("renders the snapshot", () => {
    const component = renderer.create(<ForgotPassword appToken={APP_TOKEN} submitEmailUrl={SUBMIT_URL} />)
    expect(component).toMatchSnapshot()
  })

  it("displays correct message on success", done => {
    fetchMock.post("*", {status: 201})

    const expectedResult = (
      <span>
        Instructions on how to reset your password have been sent to <b>test@artsymail.com</b>
      </span>
    )
    const wrapper = shallow(<ForgotPassword appToken={APP_TOKEN} submitEmailUrl={SUBMIT_URL} />)
    wrapper.setState({email: "test@artsymail.com"})
    const button = wrapper.find(Button)
    button.simulate("click")

    setImmediate(() => {
      const message = wrapper.find(Message)
      expect(message.contains(expectedResult)).toBeTruthy()
      done()
    })
  })

  it("displays correct message on failure", done => {
    fetchMock.post("*", {status: 400})

    const expectedResult = (
      <span>No account exists for <b>test@artsymail.com</b></span>
    )
    const wrapper = shallow(<ForgotPassword appToken={APP_TOKEN} submitEmailUrl={SUBMIT_URL} />)
    wrapper.setState({email: "test@artsymail.com"})
    const button = wrapper.find(Button)
    button.simulate("click")

    setImmediate(() => {
      const message = wrapper.find(Message)
      expect(message.contains(expectedResult)).toBeTruthy()
      done()
    })
  })
})
