import { State } from "Apps/Collect2/Routes/Collect/FilterState"
import { isDefaultFilter } from "Components/v2/ArtworkFilter/Utils/isDefaultFilter"
import qs from "qs"

export const buildUrlForCollectionApp = (state: State): string => {
  const params = removeDefaultValues(state)
  const queryString = qs.stringify(params)
  const url = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname

  return url
}

export const buildUrlForCollectApp = (state: State): string => {
  const fragment = buildCollectUrlFragmentFromState(state)
  const url = fragment ? `/collect${fragment}` : "/collect"
  return url
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
