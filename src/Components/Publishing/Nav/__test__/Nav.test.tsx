import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SponsoredArticle } from "../../Fixtures/Articles"
import { Nav } from "../Nav"

describe("Nav", () => {
  it("renders a Nav", () => {
    const nav = renderer.create(<Nav />)
    expect(nav).toMatchSnapshot()
  })
  it("renders a transparent nav", () => {
    const nav = renderer.create(<Nav transparent/>)
    expect(nav).toMatchSnapshot()
  })
  it("renders a sponsored nav", () => {
    const nav = renderer.create(<Nav sponsor={SponsoredArticle.sponsor} />)
    expect(nav).toMatchSnapshot()
  })
  it("includes a partner logo in a sponsored nav", () => {
    const nav = mount(<Nav sponsor={SponsoredArticle.sponsor} />)
    expect(nav.html()).toMatch("https://artsy-media-uploads.s3.amazonaws.com/F4RVgsSXv3q9Nrt59P8gbA%2Ffullscreen.png")
  })
  it("renders a custom title", () => {
    const nav = mount(<Nav title="Custom Title" />)
    expect(nav.text()).toMatch("Custom Title")
  })
})
