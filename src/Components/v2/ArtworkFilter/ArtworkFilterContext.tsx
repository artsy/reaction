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
  filters?: ArtworkFilters

  // Components
  ZeroState?: React.FC
  // Sorting
  sortOptions?: SortOptions

  // Handlers
  onArtworkBrickClick?: (artwork: any, props: any) => void
  onFilterClick?: (
    key: keyof ArtworkFilters,
    value: string,
    filterState: ArtworkFilters
  ) => void

  // Filter manipulationo
  hasFilters: boolean
  isDefaultValue: (name: string) => boolean
  rangeToTuple: (name: string) => [number, number]
  resetFilters: () => void
  setFilter: (name: string, value: any) => void
  unsetFilter: (name: string) => void
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
  sortOptions: [],
  unsetFilter: null,
  ZeroState: null,
})

export type SortOptions = Array<{
  value: string
  text: string
}>

export type SharedArtworkFilterContextProps = Pick<
  ArtworkFilterContextProps,
  | "filters"
  | "sortOptions"
  | "onArtworkBrickClick"
  | "onFilterClick"
  | "ZeroState"
> & {
  onChange?: (filterState) => void
}

export const ArtworkFilterContextProvider: React.FC<
  SharedArtworkFilterContextProps & {
    children: React.ReactNode
  }
> = ({
  children,
  onChange,
  filters = {},
  onArtworkBrickClick,
  onFilterClick,
  sortOptions,
  ZeroState,
}) => {
  const initialState = {
    ...initialArtworkFilterState,
    ...filters,
  }

  const [artworkFilterState, dispatch] = useReducer(
    artworkFilterReducer,
    initialState
  )

  if (onChange) {
    onChange(artworkFilterState)
  }

  const artworkFilterContext = {
    ZeroState,
    filters: artworkFilterState,
    hasFilters: hasFilters(artworkFilterState),

    // Handlers
    onArtworkBrickClick,
    onFilterClick,

    // Sorting
    sortOptions,

    // Filter manipulation
    isDefaultValue: field => {
      return isDefaultFilter(field, artworkFilterState[field])
    },

    rangeToTuple: range => {
      return rangeToTuple(artworkFilterState, range)
    },

    setFilter: (name, val) => {
      if (onFilterClick) {
        onFilterClick(name, val, artworkFilterState)
      }

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

/**
 * Hook to conveniently access fiter state context
 */
export const useArtworkFilterContext = () => {
  const artworkFilterContext = useContext(ArtworkFilterContext)
  return artworkFilterContext
}
