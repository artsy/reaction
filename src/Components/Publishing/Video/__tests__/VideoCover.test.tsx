import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Media } from "../../Fixtures/Components"
import { VideoCover, VideoCoverAsset } from "../VideoCover"

describe("Video Cover", () => {
  it("matches the snapshot", () => {
    const videoCover = renderer.create(
      <VideoCover
        media={Media[0]}
        seriesTitle="Future of Art"
        description="Lorem Ipsum Description"
      />
    ).toJSON()
    expect(videoCover).toMatchSnapshot()
  })

  it("renders video asset image", () => {
    const component = mount(
      <VideoCover
        media={Media[0]}
        seriesTitle="Future of Art"
        description="Lorem Ipsum Description"
      />
    )
    expect(component.find(VideoCoverAsset).props().src).toEqual("https://artsy-media-uploads.s3.amazonaws.com/4Tq-iYkN8dOpshFoKRXyYw%2Fcustom-Custom_Size___PoetterHall_Exterior+copy.jpg")
  })

  it("renders video info", () => {
    const component = mount(
      <VideoCover
        media={Media[0]}
        seriesTitle="Future of Art"
        description="Lorem Ipsum Description"
      />
    )

    expect(component.text()).toMatch("Lorem Ipsum Description")
    expect(component.text()).toMatch("Trevor Paglan")
  })
})
