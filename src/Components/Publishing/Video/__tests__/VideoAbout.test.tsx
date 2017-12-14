import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { VideoArticle } from "../../Fixtures/Articles"
import { VideoAbout } from "../VideoAbout"

describe("Video About", () => {
  it("matches the snapshot", () => {
    const videoAbout = renderer.create(
      <VideoAbout
        article={VideoArticle}
      />
    ).toJSON()
    expect(videoAbout).toMatchSnapshot()
  })

  it("renders the credits section", () => {
    const component = mount(
      <VideoAbout
        article={VideoArticle}
      />
    )
    expect(component.text()).toMatch("Marina Cashdan")
    expect(component.text()).toMatch("Trevor Paglan")
  })

  it("renders the about section", () => {
    const component = mount(
      <VideoAbout
        article={VideoArticle}
      />
    )
    expect(component.text()).toMatch("Lorem ipsum dolor")
  })
})
