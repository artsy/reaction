import React, { useContext, useEffect, useReducer } from "react"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { hasFilters } from "./Utils/hasFilters"
import { isDefaultFilter } from "./Utils/isDefaultFilter"
import { rangeToTuple } from "./Utils/rangeToTuple"
import { urlFragmentFromState } from "./Utils/urlFragmentFromState"

export const initialFilterState = {
  height: "*-*",
  major_periods: [],
  page: 1,
  price_range: "*-*",
  sort: "-decayed_merch",
  width: "*-*",
}

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

interface FilterContextProps {
  filters: Filters
  hasFilters: boolean
  isDefaultValue: (name: string) => boolean
  rangeToTuple: (name: string) => [number, number]
  resetFilters: () => void
  setFilter: (name: string, value: any) => void
  unsetFilter: (name: string) => void
}

export const FilterContext = React.createContext<FilterContextProps>({
  filters: initialFilterState,
  hasFilters: false,
  isDefaultValue: null,
  rangeToTuple: null,
  resetFilters: null,
  setFilter: null,
  unsetFilter: null,
})

export const FilterContextProvider: React.FC<{
  filters?: Filters
  children: React.ReactNode
}> = ({ children, filters = initialFilterState }) => {
  const [filterState, dispatch] = useReducer(filterReducer, filters)

  const artworkFilterContext = {
    filters: filterState,
    hasFilters: hasFilters(filterState),

    isDefaultValue: field => {
      return isDefaultFilter(field, filterState[field])
    },

    rangeToTuple: range => {
      return rangeToTuple(filterState, range)
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
    <FilterContext.Provider value={artworkFilterContext}>
      {children}
    </FilterContext.Provider>
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
    default: {
      throw new Error(
        `Components/v2/ArtworkFilter/ArtworkFilterContext | Error setting filter: ${JSON.stringify(
          action
        )}`
      )
    }
  }
}

/**
 * FIXME: Need to create an adaptor to wire into history state; if using as a
 * solo component we'll need to opt in.
 */
export const useURLState = state => {
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
  }, []) // FIXME: add dependencies

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
}

/**
 * Hook to conveniently access fiter state context
 */
export const useFilterContext = () => {
  const filterContext = useContext(FilterContext)
  return filterContext
}
