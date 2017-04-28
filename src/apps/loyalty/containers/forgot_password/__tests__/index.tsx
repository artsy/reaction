import * as React from "react"
import * as TestUtils from "react-dom/test-utils"
import * as renderer from "react-test-renderer"

import ForgotPassword from "../index"

jest.mock("isomorphic-fetch")

describe("Reset password", () => {
  const APP_TOKEN = "force-staging"
  const SUBMIT_URL = "https://stagingapi.artsy.net/api/v1/users/send_reset_password_instructions"

  it("renders the snapshot", () => {
    const component = renderer.create(<ForgotPassword appToken={APP_TOKEN} submitEmailUrl={SUBMIT_URL} />)
    expect(component).toMatchSnapshot()
  })

  it("displays correct message on successful request", () => {
    
  })
})