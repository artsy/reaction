import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { MobileMenu } from "../MobileMenu"

it("renders a mobile menu properly", () => {
  const menu = renderer.create(<MobileMenu />).toJSON()
  expect(menu).toMatchSnapshot()
})
