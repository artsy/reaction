import { State } from "../FilterState"
import { buildUrlForCollectApp, buildUrlForCollectionApp } from "../urlBuilder"

describe("buildUrlForCollectApp", () => {
  it("should not include unselected filters", () => {
    const state: State = {}

    const result = buildUrlForCollectApp(state)

    expect(result).toEqual("/collect")
  })

  it("should include selected filters minus medium in querystring", () => {
    const state: State = {
      acquireable: true,
      artist_id: "artistId",
      at_auction: true,
      attribution_class: ["attributionClass"],
      color: "red",
      dimension_range: "1-2",
      for_sale: true,
      height: "100",
      inquireable_only: true,
      major_periods: ["1990"],
      offerable: true,
      page: 3,
      partner_id: "gegosian",
      price_range: "10-20",
      sort: "yes",
      tracking: "no",
      width: "30-40",
    }

    const result = buildUrlForCollectApp(state)

    expect(result).toEqual(
      "/collect?acquireable=true&artist_id=artistId&at_auction=true&attribution_class%5B0%5D=attributionClass&color=red&dimension_range=1-2&for_sale=true&height=100&inquireable_only=true&major_periods%5B0%5D=1990&offerable=true&page=3&partner_id=gegosian&price_range=10-20&sort=yes&tracking=no&width=30-40"
    )
  })

  it("should include medium as part of path", () => {
    const state: State = {
      medium: "photography",
    }

    const result = buildUrlForCollectApp(state)

    expect(result).toEqual("/collect/photography")
  })
})

describe("buildUrlForCollectionApp", () => {
  beforeAll(() => {
    window.history.pushState({}, null, "/collection/kitties")
  })

  it("should not include unselected filters", () => {
    const state: State = {}

    const result = buildUrlForCollectionApp(state)

    expect(result).toEqual("/collection/kitties")
  })

  it("should include all selected filters, including medium, in querystring", () => {
    const state: State = {
      acquireable: true,
      artist_id: "artistId",
      at_auction: true,
      attribution_class: ["attributionClass"],
      color: "red",
      dimension_range: "1-2",
      for_sale: true,
      height: "100",
      inquireable_only: true,
      major_periods: ["1990"],
      medium: "photography",
      offerable: true,
      page: 3,
      partner_id: "gegosian",
      price_range: "10-20",
      sort: "yes",
      tracking: "no",
      width: "30-40",
    }

    const result = buildUrlForCollectionApp(state)

    expect(result).toEqual(
      "/collection/kitties?acquireable=true&artist_id=artistId&at_auction=true&attribution_class%5B0%5D=attributionClass&color=red&dimension_range=1-2&for_sale=true&height=100&inquireable_only=true&major_periods%5B0%5D=1990&medium=photography&offerable=true&page=3&partner_id=gegosian&price_range=10-20&sort=yes&tracking=no&width=30-40"
    )
  })
})
