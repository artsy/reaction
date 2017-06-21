import * as React from "react"
import * as TestUtils from "react-dom/test-utils"
import * as renderer from "react-test-renderer"

jest.mock("isomorphic-fetch")
const fetch = require("isomorphic-fetch").default

import Login from "../index"

describe("login", () => {
  const formConfig = {
    baseUrl: "/loyalty",
    url: "/log_in",
    csrfToken: "csrf",
    facebookPath: "/facebook",
    twitterPath: "/twitter",
  }

  afterEach(fetch.mockReset)

  it("renders the snapshot", () => {
    const login = renderer.create(<Login form={formConfig} />)
    expect(login).toMatchSnapshot()
  })

  it("renders the social buttons with the correct hrefs", () => {
    const login = TestUtils.renderIntoDocument(<Login form={formConfig} />) as Login
    const aTags = TestUtils.scryRenderedDOMComponentsWithTag(login, "a") as HTMLAnchorElement[]
    const facebookLink = aTags.find(tag => tag.href === "/facebook")
    expect(facebookLink).toBeTruthy()
    const twitterLink = aTags.find(tag => tag.href === "/twitter")
    expect(twitterLink).toBeTruthy()
  })

  it("displays correct error message", done => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        url: "http://localhost:3000/log_in?error=Invalid%20email%20or%20password",
        status: 404,
      })
    )

    const login = TestUtils.renderIntoDocument(<Login form={formConfig} />) as Login

    TestUtils.Simulate.submit(TestUtils.findRenderedDOMComponentWithTag(login, "form"))

    // Wait till the next event loop tick to assert on the expected DOM state,
    // because `setState` isn’t going to re-render until the next tick either.
    setImmediate(() => {
      const error = TestUtils.findRenderedDOMComponentWithClass(login, "error")
      expect(error.textContent).toBe("Invalid email or password")
      done()
    })
  })

  it("successful redirects after login", () => {
    fetch.mockImplementation(() => Promise.resolve({ status: 200 }))

    const login = <Login form={formConfig} />
    const renderedComponent = TestUtils.renderIntoDocument(login) as Login

    TestUtils.Simulate.submit(TestUtils.findRenderedDOMComponentWithTag(renderedComponent, "form"))
  })

  it("displays an internal error message", done => {
    fetch.mockImplementation(() => Promise.resolve({ status: 500 }))

    const login = TestUtils.renderIntoDocument(<Login form={formConfig} />) as Login

    TestUtils.Simulate.submit(TestUtils.findRenderedDOMComponentWithTag(login, "form"))

    // Wait till the next event loop tick to assert on the expected DOM state,
    // because `setState` isn’t going to re-render until the next tick either.
    setImmediate(() => {
      const error = TestUtils.findRenderedDOMComponentWithClass(login, "error")
      expect(error.textContent).toBe("Internal Error. Please contact support@artsy.net")
      done()
    })
  })

  it("displays a connection error message from catch", done => {
    fetch.mockImplementation(() => Promise.reject(new Error("Oh noes!")))

    const login = TestUtils.renderIntoDocument(<Login form={formConfig} />) as Login

    TestUtils.Simulate.submit(TestUtils.findRenderedDOMComponentWithTag(login, "form"))

    // Wait till the next event loop tick to assert on the expected DOM state,
    // because `setState` isn’t going to re-render until the next tick either.
    setImmediate(() => {
      const error = TestUtils.findRenderedDOMComponentWithClass(login, "error")
      expect(error.textContent).toBe("Internal Error. Please contact support@artsy.net")
      done()
    })
  })
})
