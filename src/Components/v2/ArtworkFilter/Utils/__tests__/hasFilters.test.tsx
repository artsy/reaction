import { hasFilters } from "../hasFilters"

describe("hasFilters", () => {
  it("it returns false if only default filters have been applied", () => {
    expect(
      hasFilters({
        height: "*-*",
        major_periods: [],
        page: 1,
        price_range: "*-*",
        sort: "-decayed_merch",
        width: "*-*",
      })
    ).toEqual(false)
  })

  it("it returns true if additional filters have been applied", () => {
    expect(
      hasFilters({
        acquireable: true,
        height: "*-*",
        major_periods: [],
        page: 1,
        price_range: "*-*",
        sort: "-decayed_merch",
        width: "*-*",
      })
    ).toEqual(true)
  })
})
