import qs from "qs"
import { Filters } from "../ArtworkFilterContext"
import { isDefaultFilter } from "./isDefaultFilter"

/**
 * Returns a string representing the query part of a URL. It removes default
 * values, and rewrites keyword -> term.
 */
export const urlFragmentFromState = (state: Filters) => {
  const { keyword: term } = state
  const filters = Object.entries(state).reduce((acc, [key, value]) => {
    if (isDefaultFilter(key, value) || key === "keyword") {
      return acc
    } else {
      return { ...acc, [key]: value }
    }
  }, {})

  return qs.stringify({
    ...filters,
    term,
  })
}
