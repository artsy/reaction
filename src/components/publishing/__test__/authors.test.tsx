import * as React from "react"
import * as renderer from "react-test-renderer"

import AuthorInfo from "../sections/authors"
import { Authors } from "./fixtures/components"

it("renders properly", () => {
  const authors = renderer.create(<AuthorInfo authors={Authors} />).toJSON()
  expect(authors).toMatchSnapshot()
})
