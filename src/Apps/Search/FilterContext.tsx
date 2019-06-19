import React, { FC, ReactNode, useContext, useEffect, useReducer } from "react"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { filterReducer } from "./filterReducer"

export interface FilterContextValues {
  setFilter: (name: string, value: any) => void
  unsetFilter: (name: string) => void
  hasFilters: boolean
  filters: Filters
  resetFilters: () => void
  isRangeSelected: (name: string) => boolean
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
  filters: {
    page: 1,
    major_periods: [],
    sort: "-decayed_merch",
    price_range: "*-*",
    height: "*-*",
    width: "*-*",
  },
  setFilter() {
    console.error("Shouldn't have gotten here.")
  },
  unsetFilter() {
    console.error("Shouldn't have gotten here.")
  },
  hasFilters: false,
  resetFilters() {
    console.error("Shouldn't have gotten here.")
  },
  isRangeSelected(_name) {
    console.error("Shouldn't have gotten here.")
    return false
  },
  rangeToTuple(name) {
    console.error("Shouldn't have gotten here.")
    return [0, 0]
  },
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

  // TODO - do this correctly. The effect needs to run any time _ANY_ of the filters change;
  //   It also needs to call history.pushState instead of console.log.
  useEffect(() => {
    if (isMounted) {
      console.log("page changed; push history here.")
    }
  }, [state.page])

  const value = {
    filters: state,
    hasFilters: hasFilters(state),
    setFilter: (name, val) =>
      dispatch({ type: "set", payload: { name, value: val } }),
    unsetFilter: name => dispatch({ type: "unset", payload: { name } }),
    // TODO - implement!
    resetFilters: () => {},
    // TODO - implement!
    isRangeSelected: () => false,
    // TODO - implement/move!
    rangeToTuple: range => rangeToTuple(state, range),
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

// Prefer using `useFilterContext`.
//   This exists for legacy class components to use as a render-prop.
// TODO - figure out how to type this
export const FilterContextConsumer = ({ children }) => {
  const filterContext = useFilterContext()
  return children(filterContext)
}
