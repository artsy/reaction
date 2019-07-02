import { getSortOptions, SortTypes } from "../SortFilterSortTypes"

describe("SortTypes", () => {
  describe(".getSortOptions", () => {
    it("returns default sort options", () => {
      const options = getSortOptions(SortTypes.default)
      expect(options.length).toBe(5)

      const values = options.map(o => o.value)
      expect(values).toEqual([
        "-decayed_merch",
        "-partner_updated_at",
        "-published_at",
        "-year",
        "year",
      ])
    })

    it("returns collection sort options", () => {
      const options = getSortOptions(SortTypes.collection)
      expect(options.length).toBe(7)

      const values = options.map(o => o.value)
      expect(values).toEqual([
        "-decayed_merch",
        "sold,-has_price,-prices",
        "sold,-has_price,prices",
        "-partner_updated_at",
        "-published_at",
        "-year",
        "year",
      ])
    })
  })
})
