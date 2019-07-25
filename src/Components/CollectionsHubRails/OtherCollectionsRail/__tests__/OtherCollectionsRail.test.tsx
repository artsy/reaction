import { CollectionsHubFixture } from "Apps/__tests__/Fixtures/Collections"
import { ArrowButton } from "Components/v2/Carousel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { OtherCollectionsRail } from "../index"

describe("CollectionsRail", () => {
  let props

  beforeEach(() => {
    props = {
      collectionGroup: CollectionsHubFixture[0].linkedCollections[0],
    }
  })

  it("Renders expected fields", () => {
    const component = mount(<OtherCollectionsRail {...props} />)

    expect(component.text()).toMatch("Other Collections")
    expect(component.text()).toMatch("Artist Posters")
    expect(component.text()).toMatch("Artist Skateboard Decks")
    expect(component.text()).toMatch("KAWS: Bearbricks")
  })

  it("Renders no arrows when there are less than 5 collections", () => {
    const component = mount(<OtherCollectionsRail {...props} />)
    expect(component.find(ArrowButton).length).toBe(1)
  })
})
