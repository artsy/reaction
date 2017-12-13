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
    expect(component.find(VideoCoverAsset).props().src).toEqual("https://artsy-vanity-files-production.s3.amazonaws.com/images/galerie-ceysson-benetiere_abmb.jpg")
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
