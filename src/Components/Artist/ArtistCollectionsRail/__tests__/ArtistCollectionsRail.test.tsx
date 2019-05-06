import { CollectionsRailFixture } from "Apps/__tests__/Fixtures/Collections"
import { mockTracking } from "Artsy/Analytics"
import { ArrowButton } from "Components/v2/CarouselV2"
import { mount } from "enzyme"
import "jest-styled-components"
import { drop } from "lodash"
import React from "react"
import Waypoint from "react-waypoint"
import { ArtistCollectionEntity } from "../ArtistCollectionEntity"
import { ArtistCollectionsRail } from "../ArtistCollectionsRail"
jest.unmock("react-tracking")

describe("CollectionsRail", () => {
  let props

  const getWrapper = (passedProps = props) => {
    return mount(<ArtistCollectionsRail {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      collections: CollectionsRailFixture,
    }
  })

  it("Renders expected fields", async () => {
    const component = await mount(
      <ArtistCollectionsRail {...props} />
    ).renderUntil(n => {
      return n.html().search("is-selected") > 0
    })
    expect(component.text()).toMatch("Browse by iconic collections")
    expect(component.find(ArtistCollectionEntity).length).toBe(8)
    expect(component.text()).toMatch("Flags")
    expect(component.text()).toMatch("From $1,000")
    expect(component.text()).toMatch("Street Art Now")
    expect(component.text()).toMatch("From $200")
  })

  it("Does not render carousel if less than 4 entries", () => {
    props.collections = drop(CollectionsRailFixture, 1)
    const component = getWrapper()

    expect(component.text()).toBe(null)
    expect(component.find(ArtistCollectionEntity).length).toBe(0)
  })

  describe("Tracking", () => {
    it("Tracks impressions", () => {
      const { Component, dispatch } = mockTracking(ArtistCollectionsRail)
      const component = mount(<Component {...props} />)
      component
        .find(Waypoint)
        .getElement()
        .props.onEnter()

      expect(dispatch).toBeCalledWith({
        action_type: "Impression",
        context_module: "CollectionsRail",
        context_page_owner_type: "Artist",
      })
    })

    it("Tracks carousel navigation", () => {
      const { Component, dispatch } = mockTracking(ArtistCollectionsRail)
      const component = mount(<Component {...props} />)
      component
        .find(ArrowButton)
        .at(1)
        .simulate("click")
      // Settimeout needed here for carousel render
      setTimeout(() => {
        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          context_module: "CollectionsRail",
          context_page_owner_type: "Artist",
          subject: "clicked next button",
          type: "Button",
        })
      })
    })
  })
})
