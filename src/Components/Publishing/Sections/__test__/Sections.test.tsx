import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { StandardArticle } from "../../Fixtures/Articles"
import { Sections } from "../Sections"

jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("react-lines-ellipsis/lib/html", () => {
  const React = require('react')
  return () => <div />
})

jest.mock('react-dom/server', () => ({
  renderToStaticMarkup: (x) => x
}))

it("renders properly", () => {
  const sections = renderer.create(<Sections article={StandardArticle} />).toJSON()
  expect(sections).toMatchSnapshot()
})
