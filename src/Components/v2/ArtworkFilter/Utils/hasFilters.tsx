import { Filters } from "../ArtworkFilterContext"
import { isDefaultFilter } from "./isDefaultFilter"

export const hasFilters: (state: Filters) => boolean = state => {
  return Object.entries(state).some(([key, value]) => {
    /**
     * TODO: I think this can be based on some flag on the filter that indicates
     * if this one should trip hasFilters.
     */
    if (key === "keyword") {
      return false
    }
    return !isDefaultFilter(key, value)
  })
}
