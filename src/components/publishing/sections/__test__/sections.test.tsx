import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import { StandardArticle } from "../../fixtures/articles"
import Sections from "../sections"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders properly", () => {
  const sections = renderer.create(<Sections article={StandardArticle} />).toJSON()
  expect(sections).toMatchSnapshot()
})
