import * as React from "react"
import * as renderer from "react-test-renderer"

import Author from "../author"
import { Authors } from "./fixtures"

it("renders properly", () => {
  const artwork = renderer.create(<Author author={Authors[0]} />).toJSON()
  expect(artwork).toMatchSnapshot()
})
