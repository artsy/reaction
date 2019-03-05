import { CollectionsRailFixture } from "Apps/__tests__/Fixtures/Collections"
import { mockTracking } from "Artsy/Analytics"
import { mount } from "enzyme"
import React from "react"
import { ArtistCollectionEntity, StyledLink } from "../ArtistCollectionEntity"
jest.unmock("react-tracking")

describe("ArtistCollectionEntity", () => {
  let props

  beforeEach(() => {
    props = {
      collection: CollectionsRailFixture[0],
    }
  })

  it("Renders expected fields", () => {
    const component = mount(<ArtistCollectionEntity {...props} />)

    expect(component.text()).not.toMatch("Jasper Johns:")
    expect(component.text()).toMatch("Flags")
    expect(component.text()).toMatch("Works from $1,000")
  })

  it("Tracks link clicks", () => {
    const { Component, dispatch } = mockTracking(ArtistCollectionEntity)
    const component = mount(<Component {...props} />)
    component.find(StyledLink).simulate("click")

    expect(dispatch).toBeCalledWith({
      action_type: "Click",
      context_module: "CollectionsRail",
      context_page_owner_type: "Artist",
      destination_path: "undefined/collection/jasper-johns-flags",
      type: "thumbnail",
    })
  })
})
