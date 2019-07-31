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

  const getWrapper = (passedProps = props) => {
    return mount(<ArtistSeriesRail {...passedProps} />)
  }

  function singleData() {
    return {
      title: "1787 keyboard",
      price_guidance: 10000,
      artworks: {
        hits: [
          {
            artist: {
              name: "Jasper John1111s",
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

  it("Renders expected fields", () => {
    const component = mount(<ArtistSeriesRail {...props} />)
    expect(component.text()).toMatch("Trending Artist Series")
    expect(component.text()).toMatch("Flags unique collectins")
  })

  it("No arrows when there are less than 5 collections", () => {
    const component = getWrapper()
    expect(component.find(ArrowButton).length).toBe(1)
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
    const editedComponent = mount(<ArtistSeriesRail {...newprops} />)
    expect(editedComponent.find(ArrowButton).length).toBe(2)
  })
})
