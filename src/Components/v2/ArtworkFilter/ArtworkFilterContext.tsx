import React, { useContext, useEffect, useReducer } from "react"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { hasFilters } from "./Utils/hasFilters"
import { isDefaultFilter } from "./Utils/isDefaultFilter"
import { rangeToTuple } from "./Utils/rangeToTuple"
import { urlFragmentFromState } from "./Utils/urlFragmentFromState"

export interface Filters {
  acquireable?: boolean
  at_auction?: boolean
  color?: string
  for_sale?: boolean
  height: string
  inquireable_only?: boolean
  keyword?: string
  major_periods: string[]
  medium?: string
  offerable?: boolean
  page: number
  partner_id?: string
  price_range: string
  sort: string
  width: string
}

export const initialFilterState = {
  height: "*-*",
  major_periods: [],
  page: 1,
  price_range: "*-*",
  sort: "-decayed_merch",
  width: "*-*",
}

export const FilterContext = React.createContext<{
  filters: Filters
  hasFilters: boolean
  isDefaultValue: (name: string) => boolean
  rangeToTuple: (name: string) => [number, number]
  resetFilters: () => void
  setFilter: (name: string, value: any) => void
  unsetFilter: (name: string) => void
}>({
  filters: initialFilterState,
  hasFilters: false,
  isDefaultValue: null,
  rangeToTuple: null,
  resetFilters: null,
  setFilter: null,
  unsetFilter: null,
})

export const FilterContextProvider: React.FC<
  Filters & { children: React.ReactNode }
> = ({
  children,
  height = "*-*",
  major_periods = [],
  medium = "",
  page = 1,
  price_range = "*-*",
  sort = "-decayed_merch",
  width = "*-*",
  ...rest
}) => {
  const [state, dispatch] = useReducer(filterReducer, {
    height,
    major_periods,
    medium,
    page,
    price_range,
    sort,
    width,
    ...rest,
  })
  const isMounted = useDidMount()
  const updateOnChange = Object.keys(state).map(prop => state[prop])

  useEffect(() => {
    if (isMounted) {
      const queryString = urlFragmentFromState(state)
      window.history.pushState(
        {},
        null,
        `${window.location.pathname}?${queryString}`
      )
    }
  }, updateOnChange)

  /**
   * TODO: use this to trigger resetting of fields when back/fwd buttons are hit
   * because otherwise it doesn't always happen.
   */
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

    isDefaultValue: field => {
      return isDefaultFilter(field, state[field])
    },

    rangeToTuple: range => {
      return rangeToTuple(state, range)
    },

    setFilter: (name, val) => {
      dispatch({
        type: "SET",
        payload: {
          name,
          value: val,
        },
      })
    },

    unsetFilter: name => {
      dispatch({
        type: "UNSET",
        payload: {
          name,
        },
      })
    },

    resetFilters: () => {
      dispatch({
        type: "RESET",
        payload: null,
      })
    },
  }

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET": {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
    }
    case "UNSET": {
      return {
        ...state,
        [action.payload.name]: initialFilterState[action.payload.name],
      }
    }
    case "RESET": {
      return initialFilterState
    }
    default:
      throw new Error("Unexpected action")
  }
}

/**
 * Hook to conveniently access fiter state context
 */
export const useFilterContext = () => {
  const filterContext = useContext(FilterContext)
  return filterContext
}

/**
 * Prefer using `useFilterContext`. This exists for legacy class components to
 * use as a render-prop.
 */
export const FilterContextConsumer = ({ children }) => {
  const filterContext = useFilterContext()
  return children(filterContext)
}
