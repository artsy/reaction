import { CollectionHubFixture } from "Apps/__tests__/Fixtures/Collections"
import { mount } from "enzyme"
import React from "react"
import {
  OtherCollectionEntity,
  StyledLink,
  ThumbnailImage,
} from "../OtherCollectionEntity"
jest.unmock("react-tracking")

describe("OtherCollectionEntity", () => {
  let props

  beforeEach(() => {
    props = {
      member: CollectionHubFixture.linkedCollections[0].members[0],
    }
  })

  it("Renders collection's meta data", () => {
    const component = mount(<OtherCollectionEntity {...props} />)

    expect(component.text()).toMatch("Artist Posters")
    expect(component.find(ThumbnailImage).length).toBe(1)
    const thumbnailImage = component
      .find(ThumbnailImage)
      .at(0)
      .getElement().props

    expect(thumbnailImage.src).toBe(
      "http://files.artsy.net/images/posters_thumbnail.png"
    )

    const link = component
      .find(StyledLink)
      .at(0)
      .getElement().props

    expect(link.href).toContain("artist-poster")
  })

  it("Returns entity with just text when there is no image", () => {
    props.member = CollectionHubFixture.linkedCollections[0].members[1]
    const component = mount(<OtherCollectionEntity {...props} />)

    expect(component.find(ThumbnailImage).length).toBe(0)
  })
})
