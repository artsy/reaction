import * as React from "react"
import * as renderer from "react-test-renderer"

import AuthorInfo from "../authors"
import { Authors } from "./fixtures"

it("renders properly", () => {
  const artwork = renderer.create(<AuthorInfo authors={Authors} />).toJSON()
  expect(artwork).toMatchSnapshot()
})
