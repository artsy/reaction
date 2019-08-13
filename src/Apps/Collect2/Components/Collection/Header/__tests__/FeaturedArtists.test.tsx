import { Breakpoint, EntityHeader } from "@artsy/palette"
import { FollowArtistButton_artist$ref } from "__generated__/FollowArtistButton_artist.graphql"
import { collectionHeaderArtworks } from "Apps/Collect2/Components/Collection/Header/__tests__/fixtures/artworks"
import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import sharify from "sharify"
import { FeaturedArtists } from "../FeaturedArtists"

describe("FeaturedArtists", () => {
  let props

  beforeEach(() => {
    props = {
      artworks: collectionHeaderArtworks,
      collection: {
        title: "KAWS: Toys",
        category: "Collectible Sculptures",
        slug: "kaws-toys",
        headerImage:
          "https://d32dm0rphc51dk.cloudfront.net/WhacjFyMKlMkNVzncPjlRA/square.jpg",
        query: {
          gene_id: null,
          artist_id: null,
          artist_ids: ["4e934002e340fa0001005336"],
        },
      },
    }
  })

  const getWrapper = (passedProps, breakpoint: Breakpoint) => {
    return mount(
      <MockBoot breakpoint={breakpoint}>
        <FeaturedArtists {...passedProps} />
      </MockBoot>
    )
  }

  it("renders featured artists when featured artists exist", () => {
    props.collection.query = {
      gene_id: null,
      artist_id: null,
      artist_ids: [],
    }
    const component = getWrapper(props, "lg")
    const entityHeaders = component.find(EntityHeader)

    expect(component.text()).toContain("Featured Artists")
    expect(entityHeaders.length).toEqual(4)
  })

  it("does not render featured artists when they don't exist", () => {
    props.artworks = {
      " $refType": null,
      " $fragmentRefs": null,
      merchandisable_artists: [],
    }
    const component = getWrapper(props, "lg")
    const entities = component.find(EntityHeader)

    expect(component.text()).not.toContain("Featured Artists")
    expect(entities.length).toEqual(0)
  })

  function anArtist() {
    return {
      id: "medicom-toy-slash-china",
      _id: "5b9821af86c8aa21d364dde5",
      name: "Medicom Toy/China",
      imageUrl:
        "https://d32dm0rphc51dk.cloudfront.net/npEmyaOeaPzkfEHX5VsmQg/square.jpg",
      birthday: "",
      nationality: "",
      " $fragmentRefs": null as FollowArtistButton_artist$ref,
    }
  }

  it("shows 3 featured artists on mobile when not filtered by artist ids", () => {
    const overrideData = jest.spyOn(sharify, "data", "get")
    overrideData.mockReturnValueOnce({ IS_MOBILE: true })

    props.collection.query = {
      artist_ids: [],
    }

    const component = getWrapper(props, "xs")
    const entityHeaders = component.find(EntityHeader)

    expect(component.text()).toContain("Featured Artists")
    expect(entityHeaders.length).toEqual(4) // 4 = 3 artists + 1 "View More"
  })

  it("shows 3 featured artists at small breakpoint when not filtered by artist ids", () => {
    props.collection.query = {
      artist_ids: [],
    }
    props.artworks = {
      " $refType": null,
      " $fragmentRefs": null,
      merchandisable_artists: [
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
      ],
    }

    const component = getWrapper(props, "sm")
    const entityHeaders = component.find(EntityHeader)

    expect(component.text()).toContain("Featured Artists")
    expect(entityHeaders.length).toEqual(4) // 4 = 3 artists + 1 "View More"
  })

  it("shows 5 featured artists at medium breakpoint when not filtered by artist ids", () => {
    props.collection.query = {
      artist_ids: [],
    }
    props.artworks = {
      " $refType": null,
      " $fragmentRefs": null,
      merchandisable_artists: [
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
      ],
    }

    const component = getWrapper(props, "md")
    const entityHeaders = component.find(EntityHeader)

    expect(component.text()).toContain("Featured Artists")
    expect(entityHeaders.length).toEqual(6) // 6 = 5 artists + 1 "View More"
  })

  it("shows 7 featured artists at large breakpoint when not filtered by artist ids", () => {
    props.collection.query = {
      artist_ids: [],
    }
    props.artworks = {
      " $refType": null,
      " $fragmentRefs": null,
      merchandisable_artists: [
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
      ],
    }

    const component = getWrapper(props, "lg")
    const entityHeaders = component.find(EntityHeader)

    expect(component.text()).toContain("Featured Artists")
    expect(entityHeaders.length).toEqual(8) // 8 = 7 artists + 1 "View More"
  })

  it("shows all featured artists after clicking 'show more'", () => {
    props.collection.query = {
      artist_ids: [],
    }
    props.artworks = {
      " $refType": null,
      " $fragmentRefs": null,
      merchandisable_artists: [
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
        anArtist(),
      ],
    }

    const component = getWrapper(props, "xs")
    const entityHeaders = component.find(EntityHeader)

    expect(entityHeaders.length).toEqual(4) // 4 = 3 artists + 1 "View More"

    const viewMore = component.find("ViewMore")
    viewMore.simulate("click")

    expect(component.find(EntityHeader).length).toEqual(6)
  })
})
