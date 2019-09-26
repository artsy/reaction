import { Vanguard2019Fixture } from "Components/Publishing/EditorialFeature/Fixtures/Vanguard2019"
import { mount } from "enzyme"
import React from "react"
import { ReadMoreButton, VanguardArtistWrapper } from "../ArtistWrapper"

describe("ArtistWrapper", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<VanguardArtistWrapper {...passedProps} />)
  }
  beforeEach(() => {
    props = {
      article: Vanguard2019Fixture.relatedArticles[0].relatedArticles[0],
      section: "emerging",
      isMobile: false,
    }
  })

  it("is closed by default", () => {
    const component = getWrapper().instance() as VanguardArtistWrapper
    expect(component.state.isExpanded).toBeFalsy()
  })

  it("#componentDidMount expands article based on slug", () => {
    window.history.pushState({}, "", "/series/artsy-vanguard-2019/victoria-sin")
    const component = getWrapper().instance() as VanguardArtistWrapper
    expect(component.state.isExpanded).toBeTruthy()
  })

  it("onExpand sets state.isExpanded", () => {
    const component = getWrapper().instance() as VanguardArtistWrapper
    const isExpanded = component.state.isExpanded
    component.onExpand()
    expect(component.state.isExpanded).toBe(!isExpanded)
  })

  /**
   * In CI there is a small but possible chance that this test could fail because
   * it randomly generates the same SVG path background for wrapper and wrapper1.
   * Unlikely, but if it does happen just re-run the same test again manually.
   */
  it("generates a random SVG background", () => {
    const component = getWrapper()
      .find("path")
      .first()
      .html()
    const component1 = getWrapper()
      .find("path")
      .first()
      .html()

    expect(component).not.toStrictEqual(component1)
  })

  it("expands or collapses background when ReadMore is selected", () => {
    const component = getWrapper()
    component.find(ReadMoreButton).simulate("click")

    expect(window.scrollTo).toHaveBeenCalled()
  })
})
