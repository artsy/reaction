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

  it("showing the correct text, price guidance, amount of hits and image", () => {
    const component = mount(<ArtistSeriesEntity {...props} />)
    expect(component.text()).toMatch("Flags unique collections")
    expect(component.text()).toMatch("From $1,000")
    expect(component.find(ArtworkImage).length).toBe(3)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props
    expect(artworkImage.src).toBe(
      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg"
    )
  })

  it("NOT rendering any artist name or the title of the artwork ", () => {
    const component = mount(<ArtistSeriesEntity {...props} />)
    expect(component.text()).not.toMatch("A great flag from Jasper")
    expect(component.text()).not.toMatch("Jasper Johns")
    expect(component.text()).not.toMatch("Back to 2046")
    expect(component.text()).not.toMatch("Andy Warhol")
    expect(component.text()).not.toMatch("An Apple")
  })

  it("uses small image width when there are more than 2 hits", () => {
    const component = mount(<ArtistSeriesEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props
    expect(component.find(ArtworkImage).length).toBe(3)
    expect(artworkImage.width).toBe(85)
  })

  it("uses medium image width when there are only 2 hits", () => {
    props.member.artworks.hits.pop()
    const component = mount(<ArtistSeriesEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props
    expect(component.find(ArtworkImage).length).toBe(2)
    expect(artworkImage.width).toBe(131)
  })

  it("uses large image width when there are only 1 hits", () => {
    props.member.artworks.hits.pop()
    const component = mount(<ArtistSeriesEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props
    expect(component.find(ArtworkImage).length).toBe(1)
    expect(artworkImage.width).toBe(265)
  })

  it("uses the hit title for alt text if there is no artist", () => {
    const component = mount(<ArtistSeriesEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props
    expect(component.find(artworkImage).length).toBe(3)
    expect(artworkImage.alt).toMatch("A great flag from Jasper")
  })

  it("uses the artist name and title for alt text if there is an artist", () => {
    props.member.artworks.hits[0].artist.name = "Jasper Johns"
    const component = mount(<ArtistSeriesEntity {...props} />)
    const artworkImage = component
      .find(ArtworkImage)
      .at(0)
      .getElement().props
    expect(component.find(artworkImage).length).toBe(3)
    expect(artworkImage.alt).toMatch("Jasper Johns, A great flag from Jasper")
  })

  it("if price_guidance is missing, NOT showing 'From $' ", () => {
    delete props.member.price_guidance
    const component = mount(<ArtistSeriesEntity {...props} />)
    console.log(component.text())
    expect(component.text()).not.toMatch("From $")
  })
})
