import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
// import { VideoArticle } from "../../Fixtures/Articles"
import { Media } from "../../Fixtures/Components"
import { VideoCover } from "../VideoCover"

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

  // it("renders video info", () => {
  //   const component = mount(
  //     <VideoCover
  //       media={Media[0]}
  //       seriesTitle="Future of Art"
  //       description="Lorem Ipsum Description"
  //     />
  //   )
  //   // expect(toggleMute).toBeCalled()
  // })

  it("renders a description", () => {
    const component = mount(
      <VideoCover
        media={Media[0]}
        seriesTitle="Future of Art"
        description="Lorem Ipsum Description"
      />
    )
    expect(component.text()).toMatch("Lorem Ipsum Description")
  })
})
