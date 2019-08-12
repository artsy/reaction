import { CollectionsHubLinkedCollections } from "Apps/__tests__/Fixtures/Collections"
import { ArrowButton } from "Components/v2/Carousel"
import { mount } from "enzyme"
import "jest-styled-components"
import { clone } from "lodash"
import React from "react"
import { ArtistSeriesRail } from "../index"
jest.unmock("react-tracking")

describe("ArtistSeriesRail", () => {
  let props

  function singleData() {
    return {
      title: "1787 keyboard",
      price_guidance: 10000,
      artworks: {
        hits: [
          {
            artist: {
              name: "Jasper Johns",
            },
            title: "keyborad",
            image: {
              url:
                "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
            },
          },
        ],
      },
    }
  }

  beforeEach(() => {
    props = {
      collectionGroup: CollectionsHubLinkedCollections.linkedCollections[0],
    }
  })

  it("showing the correct text, price guidance, and title", () => {
    const component = mount(<ArtistSeriesRail {...props} />)
    expect(component.text()).toMatch("Trending Artist Series")
    expect(component.text()).toMatch("Flags unique collections")
    expect(component.text()).toMatch("From $1,000")
  })

  it("Does NOT show arrows when there are exactly 4 collections", () => {
    const newprops = clone(props)
    newprops.collectionGroup.members = [
      singleData(),
      singleData(),
      singleData(),
      singleData(),
    ]
    const Component = mount(<ArtistSeriesRail {...newprops} />)
    expect(Component.find(ArrowButton).length).toBe(0)
  })

  it("Arrows appear when there are more than 5 collections", () => {
    const newprops = clone(props)
    newprops.collectionGroup.members = [
      singleData(),
      singleData(),
      singleData(),
      singleData(),
      singleData(),
      singleData(),
      singleData(),
    ]
    const Component = mount(<ArtistSeriesRail {...newprops} />)
    expect(Component.find(ArrowButton).length).toBe(2)
  })
})
