import qs from "qs"
import React, { FC, ReactNode, useContext, useEffect, useReducer } from "react"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { filterReducer } from "./filterReducer"

export interface FilterContextValues {
  setFilter: (name: string, value: any) => void
  unsetFilter: (name: string) => void
  hasFilters: boolean
  filters: Filters
  resetFilters: () => void
  isDefaultValue: (name: string) => boolean
  rangeToTuple: (name: string) => [number, number]
}

interface FilterContextProps {
  children: ReactNode
  keyword?: string
  page?: number
  medium?: string
  for_sale?: boolean
  offerable?: boolean
  acquireable?: boolean
  at_auction?: boolean
  inquireable_only?: boolean
  major_periods?: string[]
  partner_id?: string
  sort?: string
  price_range?: string
  height?: string
  width?: string
  color?: string
}

export const FilterContext = React.createContext<FilterContextValues>({
  // TODO - consolidate these initial values....
  filters: {
    page: 1,
    major_periods: [],
    sort: "-decayed_merch",
    price_range: "*-*",
    height: "*-*",
    width: "*-*",
  },
  setFilter: null,
  unsetFilter: null,
  hasFilters: false,
  resetFilters: null,
  isDefaultValue: null,
  rangeToTuple: null,
})

export interface Filters {
  page: number
  keyword?: string
  medium?: string
  for_sale?: boolean
  offerable?: boolean
  acquireable?: boolean
  at_auction?: boolean
  inquireable_only?: boolean
  major_periods: string[]
  partner_id?: string
  sort: string
  price_range: string
  height: string
  width: string
  color?: string
}

export const FilterContextProvider: FC<FilterContextProps> = ({
  children,
  keyword,
  // TODO - consolidate these initial values....
  page = 1,
  medium = "",
  for_sale,
  offerable,
  acquireable,
  at_auction,
  inquireable_only,
  major_periods = [],
  partner_id,
  sort = "-decayed_merch",
  price_range = "*-*",
  height = "*-*",
  width = "*-*",
  color,
}) => {
  const initialFilters: Filters = {
    page,
    keyword,
    medium,
    for_sale,
    offerable,
    acquireable,
    at_auction,
    inquireable_only,
    major_periods,
    partner_id,
    sort,
    price_range,
    height,
    width,
    color,
  }

  const [state, dispatch] = useReducer(filterReducer, initialFilters)
  const isMounted = useDidMount()

  useEffect(() => {
    if (isMounted) {
      const queryString = urlFragmentFromState(state)
      window.history.pushState(
        {},
        null,
        `${window.location.pathname}?${queryString}`
      )
    }
  }, Object.keys(state).map(prop => state[prop]))

  // TODO - use this to trigger resetting of fields when back/fwd buttons are hit
  //   because otherwise it doesn't always happen.
  useEffect(() => {
    window.addEventListener("popstate", handleChange)
    return () => window.removeEventListener("popstate", handleChange)
  }, [])
  function handleChange() {
    console.log("derive state from URL here, and update!")
  }

  const value = {
    filters: state,
    hasFilters: hasFilters(state),
    setFilter: (name, val) =>
      dispatch({ type: "set", payload: { name, value: val } }),
    unsetFilter: name => dispatch({ type: "unset", payload: { name } }),
    isDefaultValue: field => isDefaultFilter(field, state[field]),
    rangeToTuple: range => rangeToTuple(state, range),
    // TODO - implement!
    resetFilters: () => {},
  }
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

const hasFilters: (state: Filters) => boolean = state => {
  return Object.entries(state).some(([key, value]) => {
    // TODO - I think this can be based on some flag on the filter
    //   that indicates if this one should trip hasFilters. yucky, though.
    if (key === "keyword") return false
    return !isDefaultFilter(key, value)
  })
}

// Returns a string representing the query part of a URL.
// It removes default values, and rewrites keyword -> term.
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

// TODO - something...not sure what yet. Can it be consolidated with initial value stuff?
const isDefaultFilter: (name: string, value: any) => boolean = (
  name,
  value
) => {
  if (name === "major_periods") {
    return value.length === 0
  }

  if (name === "sort") {
    return value === "-decayed_merch"
  }

  if (name === "medium") {
    return value === "*" || !value
  }

  if (name === "price_range" || name === "height" || name === "width") {
    return value === "*-*"
  }

  if (name === "page") {
    return value === 1
  }

  return !value
}

// TODO - this doesn't really belong here. It's a util.
//   Or maybe it belongs attached to individual filters?
export const MIN_PRICE = 50
export const MAX_PRICE = 50000
export const MIN_HEIGHT = 1
export const MAX_HEIGHT = 120
export const MIN_WIDTH = 1
export const MAX_WIDTH = 120
const rangeToTuple: (state: Filters, range: string) => [number, number] = (
  state,
  range
) => {
  let minStr: string
  let maxStr: string
  let min: number
  let max: number
  if (range === "price_range") {
    ;[minStr, maxStr] = state.price_range.split("-")
    min = minStr === "*" ? MIN_PRICE : Number(minStr)
    max = maxStr === "*" ? MAX_PRICE : Number(maxStr)
  } else if (range === "height") {
    ;[minStr, maxStr] = state.height.split("-")
    min = minStr === "*" ? MIN_HEIGHT : Number(minStr)
    max = maxStr === "*" ? MAX_HEIGHT : Number(maxStr)
  } else if (range === "width") {
    ;[minStr, maxStr] = state.width.split("-")
    min = minStr === "*" ? MIN_WIDTH : Number(minStr)
    max = maxStr === "*" ? MAX_WIDTH : Number(maxStr)
  } else {
    ;[minStr, maxStr] = ["*", "*"]
  }
  return [min, max]
}

export const useFilterContext = () => {
  const filterContext = useContext(FilterContext)
  return filterContext
}

// TODO - figure out how to type this
/**
 * Prefer using `useFilterContext`.
 *   This exists for legacy class components to use as a render-prop.
 */
export const FilterContextConsumer = ({ children }) => {
  const filterContext = useFilterContext()
  return children(filterContext)
}
