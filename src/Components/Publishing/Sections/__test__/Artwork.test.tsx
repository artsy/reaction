import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import { Images } from "../../Fixtures/Components"
import Artwork from "../Artwork"

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})

it("renders properly", () => {
  const artwork = renderer.create(<Artwork artwork={Images[0]} />).toJSON()
  expect(artwork).toMatchSnapshot()
})
