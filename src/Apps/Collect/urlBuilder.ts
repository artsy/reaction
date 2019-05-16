import qs from "qs"
import { State } from "./FilterState"

export const CollectUrlBuilder: (state: State) => string = state => {
  return urlFragmentFromState(state)
}

export const CollectionUrlBuilder: (state: State) => string = state => {
  return urlFragmentFromState(state)
}

// Returns a string representing the query part of a URL.
// It removes default values.
export const urlFragmentFromState = (state: State) => {
  const filters = Object.entries(state).reduce((acc, [key, value]) => {
    if (isDefaultFilter(key, value)) {
      return acc
    } else {
      return { ...acc, [key]: value }
    }
  }, {})

  return qs.stringify(filters)
}

// This is used to remove default state params that clutter up URLs.
const isDefaultFilter = (filter, value): boolean => {
  if (filter === "major_periods" || filter === "attribution_class") {
    return value.length === 0
  }

  if (filter === "sort") {
    return value === "-decayed_merch"
  }

  if (filter === "price_range" || filter === "height" || filter === "width") {
    return value === "*-*"
  }

  if (filter === "page") {
    return value === 1
  }

  if (filter === "medium") {
    return value === "*"
  }

  return !value
}
