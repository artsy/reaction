import { Vanguard2019Fixture } from "Components/Publishing/EditorialFeature/Fixtures/Vanguard2019"
import { mount } from "enzyme"
import React from "react"
import { VanguardArtistWrapper } from "../ArtistWrapper"

describe("ArtistWrapper", () => {
  let props

  const getWrapper = (passedProps = props) => {
    return mount(<VanguardArtistWrapper {...passedProps} />)
  }
  beforeEach(() => {
    props = {
      article: Vanguard2019Fixture.relatedArticles[0].relatedArticles[0],
      section: "emerging",
    }
  })

  it("is closed by default", () => {
    const component = getWrapper().instance() as VanguardArtistWrapper
    expect(component.state.isExpanded).toBeFalsy()
  })

  it("#componentDidMount expands article based on slug", () => {
    window.history.pushState(
      {},
      "",
      "/series/artsy-vanguard-2019/genesis-balenger"
    )
    const component = getWrapper().instance() as VanguardArtistWrapper
    expect(component.state.isExpanded).toBeTruthy()
  })

  it("onExpand sets state.isExpanded", () => {
    const component = getWrapper().instance() as VanguardArtistWrapper
    const isExpanded = component.state.isExpanded
    component.onExpand()
    expect(component.state.isExpanded).toBe(!isExpanded)
  })

  // it("#getRandomSVG", () => {})
  // it("#getSVGBackground", () => {})
})
