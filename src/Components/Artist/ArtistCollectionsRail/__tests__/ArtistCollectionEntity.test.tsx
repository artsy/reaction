import { CollectionsRailFixture } from "Apps/__tests__/Fixtures/Collections"
import { mount } from "enzyme"
import React from "react"
import { ArtistCollectionEntity } from "../ArtistCollectionEntity"

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
})
