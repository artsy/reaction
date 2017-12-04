import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Timestamp } from "../Timestamp"

it("renders properly", () => {
  const timestamp = renderer.create(
    <Timestamp
      duration={5000}
      currentTime={2000}
    />
  ).toJSON()
  expect(timestamp).toMatchSnapshot()
})
