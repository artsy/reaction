import { ArtworkFilters } from "../ArtworkFilterContext"
import { isDefaultFilter } from "./isDefaultFilter"

export const hasFilters: (state: ArtworkFilters) => boolean = state => {
  return Object.entries(state).some(([key, value]) => {
    return !isDefaultFilter(key, value)
  })
}
