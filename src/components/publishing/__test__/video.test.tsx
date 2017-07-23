import * as React from "react"
import * as renderer from "react-test-renderer"
import Video from "../video"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders properly", () => {
  const artwork = renderer.create(<Video src={"https://www.youtube.com/watch?v=PXi7Kjlsz9A"} />).toJSON()
  expect(artwork).toMatchSnapshot()
})
