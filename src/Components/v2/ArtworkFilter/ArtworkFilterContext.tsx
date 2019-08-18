import React, { useContext, useReducer } from "react"
import { hasFilters } from "./Utils/hasFilters"
import { isDefaultFilter } from "./Utils/isDefaultFilter"
import { rangeToTuple } from "./Utils/rangeToTuple"

export const initialArtworkFilterState = {
  height: "*-*",
  major_periods: [],
  page: 1,
  price_range: "*-*",
  sort: "-decayed_merch",
  width: "*-*",
}

export interface ArtworkFilters {
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

interface ArtworkFilterContextProps {
  filters: ArtworkFilters
  hasFilters: boolean
  isDefaultValue: (name: string) => boolean
  rangeToTuple: (name: string) => [number, number]
  resetFilters: () => void
  setFilter: (name: string, value: any) => void
  unsetFilter: (name: string) => void
  ZeroState?: React.FC
}

export const ArtworkFilterContext = React.createContext<
  ArtworkFilterContextProps
>({
  filters: initialArtworkFilterState,
  hasFilters: false,
  isDefaultValue: null,
  rangeToTuple: null,
  resetFilters: null,
  setFilter: null,
  unsetFilter: null,
  ZeroState: null,
})

export const ArtworkFilterContextProvider: React.FC<{
  filters?: ArtworkFilters
  children: React.ReactNode
  updateURLOnChange?: (filterState) => void
  ZeroState?: ArtworkFilterContextProps["ZeroState"]
}> = ({ children, updateURLOnChange, filters = {}, ZeroState }) => {
  const useUpdateHook = updateURLOnChange ? useURLBarReducer : useReducer

  const [artworkFilterState, dispatch] = useUpdateHook(
    artworkFilterReducer,
    {
      ...initialArtworkFilterState,
      ...filters,
    },
    updateURLOnChange
  )

  const artworkFilterContext = {
    ZeroState,
    filters: artworkFilterState,
    hasFilters: hasFilters(artworkFilterState),

    isDefaultValue: field => {
      return isDefaultFilter(field, artworkFilterState[field])
    },

    rangeToTuple: range => {
      return rangeToTuple(artworkFilterState, range)
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
    <ArtworkFilterContext.Provider value={artworkFilterContext}>
      {children}
    </ArtworkFilterContext.Provider>
  )
}

const artworkFilterReducer = (state, action) => {
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
        [action.payload.name]: initialArtworkFilterState[action.payload.name],
      }
    }
    case "RESET": {
      return initialArtworkFilterState
    }
    default:
      return state
  }
}

const useURLBarReducer = (reducer, initialState, urlUpdater) => {
  let state = reducer(initialState, {})

  const dispatch = action => {
    state = reducer(state, action)
    urlUpdater(state)
  }

  return [state, dispatch]
}

/**
 * Hook to conveniently access fiter state context
 */
export const useArtworkFilterContext = () => {
  const artworkFilterContext = useContext(ArtworkFilterContext)
  return artworkFilterContext
}
