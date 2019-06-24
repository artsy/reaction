import { CollectionsRailFixture } from "Apps/__tests__/Fixtures/Collections"
import { mockTracking } from "Artsy/Analytics"
import { mount } from "enzyme"
import React from "react"
import {
  ArtistCollectionEntity,
  ArtworkImage,
  StyledLink,
} from "../ArtistCollectionEntity"
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
    expect(component.text()).toMatch("From $1,000")
    expect(component.find(ArtworkImage).length).toBe(3)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props

    expect(artworkImage.src).toBe(
      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg"
    )
    expect(artworkImage.alt).toBe("Jasper Johns, Flag")
    expect(artworkImage.width).toBe(85)
  })

  it("Returns proper image size if 2 artworks returned", () => {
    props.collection.artworks.hits.pop()
    const component = mount(<ArtistCollectionEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props

    expect(component.find(ArtworkImage).length).toBe(2)
    expect(artworkImage.width).toBe(131)
  })

  it("Renders a backup image if no artworks returned", () => {
    props.collection.artworks.hits = []
    const component = mount(<ArtistCollectionEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props

    expect(component.find(ArtworkImage).length).toBe(1)
    expect(artworkImage.src).toBe(
      "http://files.artsy.net/images/jasperjohnsflag.png"
    )
    expect(artworkImage.width).toBe(265)
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
