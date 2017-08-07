import * as React from "react"
import * as renderer from "react-test-renderer"
import Sections from "../sections/sections"
import Articles from "./fixtures/articles"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders properly", () => {
  const sections = renderer.create(<Sections article={Articles[1]} />).toJSON()
  expect(sections).toMatchSnapshot()
})
