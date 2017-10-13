import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { Authors } from "../../Fixtures/Components"
import { Authors as AuthorInfo } from "../Authors"

it("renders properly", () => {
  const authors = renderer.create(<AuthorInfo authors={Authors} />).toJSON()
  expect(authors).toMatchSnapshot()
})
