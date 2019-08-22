import { initialArtworkFilterState } from "../../ArtworkFilterContext"
import { isDefaultFilter } from "../isDefaultFilter"

describe("isDefaultFilter", () => {
  it("returns true if filter is present in defaults", () => {
    Object.entries(initialArtworkFilterState).forEach(([key, value]) => {
      expect(isDefaultFilter(key, value)).toEqual(true)
    })
  })

  it("returns false if filter is not a default", () => {
    expect(isDefaultFilter("foo", "bar")).toBe(false)
    expect(isDefaultFilter("baz", "bam")).toBe(false)
  })
})
