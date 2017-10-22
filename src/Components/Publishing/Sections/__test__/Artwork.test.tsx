import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { Images } from "../../Fixtures/Components"
import { Artwork } from "../Artwork"

jest.mock("react-lines-ellipsis/lib/html", () => {
  const React = require('react')
  return () => <div />
})

jest.mock('react-dom/server', () => ({
  renderToStaticMarkup: (x) => x
}))

it("renders properly", () => {
  const artwork = renderer.create(<Artwork artwork={Images[0]} />).toJSON()
  expect(artwork).toMatchSnapshot()
})
