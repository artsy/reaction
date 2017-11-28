import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { VideoPlayer } from "../VideoPlayer"

it("renders properly", () => {
  const videoPlayer = renderer.create(<VideoPlayer url="http://files.artsy.net/videos/placeholder.mp4" />).toJSON()
  expect(videoPlayer).toMatchSnapshot()
})
