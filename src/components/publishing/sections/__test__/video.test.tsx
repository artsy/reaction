import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import { Videos } from "../../fixtures/components"
import Video from "../video"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders properly", () => {
  const video = renderer.create(<Video section={Videos[0]} />).toJSON()
  expect(video).toMatchSnapshot()
})
