import { FilterState } from "./FilterState"

export const CollectUrlBuilder: (state: FilterState) => string = state => {
  return "collect"
}

export const CollectionUrlBuilder: (state: FilterState) => string = state => {
  return "collection"
}
