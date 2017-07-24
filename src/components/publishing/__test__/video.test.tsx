import * as React from "react"
import * as renderer from "react-test-renderer"
import Video from "../video"
import { Videos } from "./fixtures"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders properly", () => {
  const artwork = renderer.create(<Video section={Videos[0]} />).toJSON()
  expect(artwork).toMatchSnapshot()
})
