import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Media } from "../../Fixtures/Components"
import { VideoInfoBlock } from "../VideoInfoBlock"

describe("Video Info Block", () => {
  it("matches the snapshot", () => {
    const videoInfo = renderer.create(
      <VideoInfoBlock
        media={Media[0]}
        seriesTitle="The Future of Art"
      />
    ).toJSON()
    expect(videoInfo).toMatchSnapshot()
  })

  it("renders titles and duration", () => {
    const component = mount(
      <VideoInfoBlock
        media={Media[0]}
        seriesTitle="The Future of Art"
      />
    )
    expect(component.text()).toMatch("The Future of Art")
    expect(component.text()).toMatch("Trevor Paglan")
    expect(component.text()).toMatch("02:28")
  })
})
