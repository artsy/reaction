import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import { Authors } from "../../fixtures/components"
import AuthorInfo from "../authors"

it("renders properly", () => {
  const authors = renderer.create(<AuthorInfo authors={Authors} />).toJSON()
  expect(authors).toMatchSnapshot()
})
