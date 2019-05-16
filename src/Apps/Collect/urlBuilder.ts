import qs from "qs"
import { State } from "./FilterState"

export const buildUrlForCollectionApp = (state: State): string => {
  const params = removeDefaultValues(state)
  const queryString = qs.stringify(params)

  return queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname
}

export const buildUrlForCollectApp = (state: State): string => {
  const fragment = buildCollectUrlFragmentFromState(state)

  return fragment ? `/collect${fragment}` : "/collect"
}

const buildCollectUrlFragmentFromState = (state: State): string => {
  const { medium, ...params } = removeDefaultValues(state)

  const emptyOrSpecificMedium = medium ? `/${medium}` : ""

  if (Object.keys(params).length === 0) {
    return emptyOrSpecificMedium
  }

  return `${emptyOrSpecificMedium}?${qs.stringify(params)}`
}

const removeDefaultValues = (state: State): State => {
  return Object.entries(state).reduce((acc, [key, value]) => {
    if (isDefaultFilter(key, value)) {
      return acc
    } else {
      return { ...acc, [key]: value }
    }
  }, {})
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
