import * as React from "react"
import * as renderer from "react-test-renderer"

import Artwork from "../artwork"
import { Images } from "./fixtures"

it("renders properly", () => {
  const artwork = renderer.create(<Artwork artwork={Images[0]} />).toJSON()
  expect(artwork).toMatchSnapshot()
})
