import { CollectionsFixture } from "Apps/__tests__/Fixtures/Collections"
import { EntityHeader } from "Components/v2/EntityHeader"
import { mount } from "enzyme"
import React from "react"
import { CollectionsGrid } from "../CollectionsGrid"

describe("CollectionsGrid", () => {
  const getWrapper = passedProps => {
    return mount(<CollectionsGrid {...passedProps} />)
  }

  let props
  beforeEach(() => {
    props = {
      collections: CollectionsFixture,
    }
  })

  it("Renders a list of collections", () => {
    const component = getWrapper(props)

    expect(component.find(EntityHeader).length).toBe(6)
    expect(component.text()).toMatch("Big Artists, Small Sculptures")
    expect(component.html()).toMatch("pumpkinsbigartistsmallsculpture")
  })

  it("Renders a categoryName if provided", () => {
    props.name = "Collectible Sculptures"
    const component = getWrapper(props)

    expect(component.text()).toMatch("Collectible Sculptures")
  })

  it("Renders category name as an #id", () => {
    props.name = "Collectible Sculptures"
    const component = getWrapper(props)

    expect(component.find("#collectible-sculptures")).toBeTruthy()
  })
})
