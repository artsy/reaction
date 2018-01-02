import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SponsoredArticle } from "../../Fixtures/Articles"
import { Nav, NavComponent } from "../Nav"

describe("Nav", () => {
  it("renders a Nav", () => {
    const nav = renderer.create(<Nav />)
    expect(nav).toMatchSnapshot()
  })
  it("renders a transparent nav", () => {
    const nav = renderer.create(<Nav transparent />)
    expect(nav).toMatchSnapshot()
  })
  it("renders a sponsored nav", () => {
    const nav = renderer.create(<Nav sponsor={SponsoredArticle.sponsor} />)
    expect(nav).toMatchSnapshot()
  })
  it("includes a partner logo in a sponsored nav", () => {
    const nav = mount(<Nav sponsor={SponsoredArticle.sponsor} />)
    expect(nav.html()).toMatch("https://artsy-media-uploads.s3.amazonaws.com/GEu3iYW6CQhbVxsjpOYwZQ%2FGKL_Wort-Bildmarke_negative_rgb+2.png")
  })
  it("renders a custom title", () => {
    const nav = mount(<Nav title="Custom Title" />)
    expect(nav.text()).toMatch("Custom Title")
  })

  it("setPosition sets the state if props.canFix", () => {
    const nav = mount(<NavComponent />)
    nav.instance().setPosition(true)
    expect(nav.state().isFixed).toBe(true)
  })

  it("setPosition does not set state if without props.canFix", () => {
    const nav = mount(<NavComponent canFix={false} />)
    nav.instance().setPosition(true)
    expect(nav.state().isFixed).toBe(false)
  })
})
