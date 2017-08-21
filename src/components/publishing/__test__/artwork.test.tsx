import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import Artwork from "../sections/artwork"
import { Images } from "./fixtures/components"

it("renders properly", () => {
  const artwork = renderer.create(<Artwork artwork={Images[0]} />).toJSON()
  expect(artwork).toMatchSnapshot()
})
