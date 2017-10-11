import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import { StandardArticle } from "../../Fixtures/Articles"
import Sections from "../Sections"

jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})

it("renders properly", () => {
  const sections = renderer.create(<Sections article={StandardArticle} />).toJSON()
  expect(sections).toMatchSnapshot()
})
