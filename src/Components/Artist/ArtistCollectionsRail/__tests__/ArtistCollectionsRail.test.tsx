import { CollectionsRailFixture } from "Apps/__tests__/Fixtures/Collections"
import { mount } from "enzyme"
import "jest-styled-components"
import { drop } from "lodash"
import React from "react"
import { ArtistCollectionEntity } from "../ArtistCollectionEntity"
import { ArtistCollectionsRail } from "../ArtistCollectionsRail"

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

  it("Renders expected fields", () => {
    const component = getWrapper()
    expect(component.text()).toMatch("Browse by series")
    expect(component.find(ArtistCollectionEntity).length).toBe(8)
    expect(component.text()).toMatch("Flags")
    expect(component.text()).toMatch("Works from $1,000")
    expect(component.text()).toMatch("Street Art Now")
    expect(component.text()).toMatch("Works from $200")
  })

  it("Does not render carousel if less than 4 entries", () => {
    props.collections = drop(CollectionsRailFixture, 1)
    const component = getWrapper()

    expect(component.text()).toBe(null)
    expect(component.find(ArtistCollectionEntity).length).toBe(0)
  })
})
