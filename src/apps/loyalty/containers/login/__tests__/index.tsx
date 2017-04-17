import * as React from "react"
import * as ReactTestUtils from "react-dom/test-utils"
import * as renderer from "react-test-renderer"

import Login from "../index"

describe("login", () => {
  it("renders the snapshot", () => {
    const formConfig = {
      url: "/log_in",
      csrfToken: "csrf",
      facebookPath: "/facebook",
      twitterPath: "/twitter",
    }
    const login = renderer.create(<Login form={formConfig} />)
    expect(login).toMatchSnapshot()
  })

  it("renders the social buttons with the correct hrefs", () => {
    const formConfig = {
      url: "/log_in",
      csrfToken: "csrf",
      facebookPath: "/facebook",
      twitterPath: "/twitter",
    }
    const login = ReactTestUtils.renderIntoDocument(<Login form={formConfig} />)
    const aTags = ReactTestUtils.scryRenderedDOMComponentsWithTag(login, "a")
    const facebookLink = aTags.find(tag => tag.href === "/facebook")
    expect(facebookLink).toBeTruthy()
    const twitterLink = aTags.find(tag => tag.href === "/twitter")
    expect(twitterLink).toBeTruthy()
  })
})
