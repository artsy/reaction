import { CollectionHubFixture } from "Apps/__tests__/Fixtures/Collections"
import { ArrowButton } from "Components/v2/Carousel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import {
  FeaturedCollectionEntity,
  FeaturedCollectionsRails,
  FeaturedImage,
} from "../index"

describe("FeaturedCollectionsRails", () => {
  let props

  beforeEach(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[1],
    }
  })

  const memberData = () => {
    return {
      description:
        "<p>From SpongeBob SquarePants to Snoopy, many beloved childhood cartoons have made an impact on the history of art.</p>",
      price_guidance: 60,
      slug: "art-inspired-by-cartoons",
      thumbnail: "http://files.artsy.net/images/cartoons_thumbnail.png",
      title: "Art Inspired by Cartoons",
    }
  }

  it("Renders expected fields", () => {
    const component = mount(<FeaturedCollectionsRails {...props} />)

    expect(component.text()).toMatch("Featured Collections")
    expect(component.text()).toMatch("Art Inspired by Cartoons")
    expect(component.text()).toMatch("Street Art: Celebrity Portraits")
    expect(component.text()).toMatch("Street Art: Superheroes and Villains")
  })

  it("Renders no arrows when there are less than 5 collections", () => {
    const component = mount(<FeaturedCollectionsRails {...props} />)
    expect(component.find(ArrowButton).length).toBe(1)
  })

  it("Renders arrows when there are more than 4 featured collections", () => {
    props.collectionGroup.members = [
      memberData(),
      memberData(),
      memberData(),
      memberData(),
      memberData(),
    ]

    const component = mount(<FeaturedCollectionsRails {...props} />)
    expect(component.find(ArrowButton).length).toBe(2)
  })
})

describe("FeaturedCollectionEntity", () => {
  let props

  beforeEach(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[1],
    }
  })

  it("Renders expected fields for FeaturedCollectionEntity", () => {
    const component = mount(<FeaturedCollectionsRails {...props} />)
    const firstEntity = component.find(FeaturedCollectionEntity).at(0)
    expect(firstEntity.text()).toMatch("From SpongeBob SquarePants to Snoopy")
    expect(firstEntity.text()).toMatch("Starting at $60")
    const featuredImage = component.find(FeaturedImage).at(0)
    expect(featuredImage.getElement().props.src).toBe(
      "http://files.artsy.net/images/cartoons_thumbnail.png"
    )
  })
})
