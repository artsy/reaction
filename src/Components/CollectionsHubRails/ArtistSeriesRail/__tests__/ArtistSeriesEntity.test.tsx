import { CollectionsHubLinkedCollections } from "Apps/__tests__/Fixtures/Collections"
import { mount } from "enzyme"
import React from "react"
import { ArtistSeriesEntity, ArtworkImage } from "../ArtistSeriesEntity"
jest.unmock("react-tracking")

describe("ArtistSeriesEntity", () => {
  let props

  beforeEach(() => {
    props = {
      member: CollectionsHubLinkedCollections.linkedCollections[0].members[0],
    }
  })

  it("Renders expected fields", () => {
    const component = mount(<ArtistSeriesEntity {...props} />)

    expect(component.text()).not.toMatch("Jasper Johns:")
    expect(component.text()).toMatch("Flag")
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
    props.member.artworks.hits.pop()
    const component = mount(<ArtistSeriesEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props

    expect(component.find(ArtworkImage).length).toBe(2)
    expect(artworkImage.width).toBe(131)
  })
})
