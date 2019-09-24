import { omit } from "lodash"
import React, { useContext, useReducer, useState } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { hasFilters } from "./Utils/hasFilters"
import { isDefaultFilter } from "./Utils/isDefaultFilter"
import { rangeToTuple } from "./Utils/rangeToTuple"

/**
 * Initial filter state
 */
export const initialArtworkFilterState = {
  attribution_class: [],
  major_periods: [],
  page: 1,
  sort: "-decayed_merch",

  // TODO: Remove these unneeded default props
  // height: "*-*",
  // price_range: "*-*",
  // width: "*-*",
}

/**
 * A list of all possible artwork filters across all apps
 */
export interface ArtworkFilters {
  acquireable?: boolean
  artist_id?: string
  at_auction?: boolean
  color?: string
  for_sale?: boolean
  height?: string
  inquireable_only?: boolean
  keyword?: string
  major_periods?: string[]
  medium?: string
  offerable?: boolean
  page?: number
  partner_id?: string
  price_range?: string
  sort?: string
  term?: string
  width?: string
}

/**
 * Possible aggregations that can be passed
 */
export type Aggregations = Array<{
  slice:
    | "COLOR"
    | "DIMENSION_RANGE"
    | "FOLLOWED_ARTISTS"
    | "GALLERY"
    | "INSTITUTION"
    | "MAJOR_PERIOD"
    | "MEDIUM"
    | "MERCHANDISABLE_ARTISTS"
    | "PARTNER_CITY"
    | "PERIOD"
    | "PRICE_RANGE"
    | "TOTAL"
  counts: Array<{
    count: number
    id: string
    name: string
  }>
}>

interface Counts {
  for_sale_artworks?: number
  ecommerce_artworks?: number
  auction_artworks?: number
  artworks?: number
  has_make_offer_artworks?: boolean
}

interface ArtworkFilterContextProps {
  filters?: ArtworkFilters

  // Components
  ZeroState?: React.FC

  // Sorting
  sortOptions?: SortOptions
  aggregations?: Aggregations
  setAggregations?: (aggregations: Aggregations) => void
  counts?: Counts
  setCounts?: (counts: Counts) => void

  // Handlers
  onArtworkBrickClick?: (artwork: any, props: any) => void
  onFilterClick?: (
    key: keyof ArtworkFilters,
    value: string,
    filterState: ArtworkFilters
  ) => void

  // Filter manipulation
  hasFilters: boolean
  isDefaultValue: (name: string) => boolean
  rangeToTuple: (name: string) => [number, number]
  resetFilters: () => void
  setFilter: (name: string, value: any) => void
  unsetFilter: (name: string) => void
}

/**
 * Context behavior shared globally across the ArtworkFilter component tree
 */
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
  | "aggregations"
  | "counts"
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
  aggregations = [],
  children,
  counts = {},
  filters = {},
  onArtworkBrickClick,
  onChange,
  onFilterClick,
  sortOptions,
  ZeroState,
}) => {
  const initialFilterState = {
    ...initialArtworkFilterState,
    ...filters,
  }

  const [artworkFilterState, dispatch] = useReducer(
    artworkFilterReducer,
    initialFilterState
  )

  // TODO: Consolidate this into additional reducer
  const [filterAggregations, setAggregations] = useState(aggregations)
  const [artworkCounts, setCounts] = useState(counts)

  useDeepCompareEffect(() => {
    if (onChange) {
      onChange(omit(artworkFilterState, ["reset"]))
    }
  }, [artworkFilterState])

  const artworkFilterContext = {
    filters: artworkFilterState,
    hasFilters: hasFilters(artworkFilterState),

    // Handlers
    onArtworkBrickClick,
    onFilterClick,

    // Sorting
    sortOptions,
    aggregations: filterAggregations,
    setAggregations,
    counts: artworkCounts,
    setCounts,

    // Components
    ZeroState,

    // Filter manipulation
    isDefaultValue: field => {
      return isDefaultFilter(field, artworkFilterState[field])
    },

    rangeToTuple: range => {
      return rangeToTuple(artworkFilterState, range)
    },

    setFilter: (name, val) => {
      if (onFilterClick) {
        onFilterClick(name, val, { ...artworkFilterState, [name]: val })
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
    /**
     * Setting  and updating filters
     */
    case "SET": {
      const { name, value } = action.payload

      let filterState = {}

      if (name === "attribution_class") {
        filterState = {
          attribution_class: state.filters.attribution_class.concat(value),
        }
      }
      if (name === "major_periods") {
        filterState = {
          major_periods: value ? [value] : [],
        }
      }
      if (name === "page") {
        filterState[name] = Number(value)
      }

      // String filter types
      ;[
        "color",
        "height",
        "medium",
        "partner_id",
        "price_range",
        "sort",
        "width",
      ].forEach(filter => {
        if (name === filter) {
          filterState[name] = value
        }
      })

      // Boolean filter types
      ;[
        "acquireable",
        "at_auction",
        "for_sale",
        "inquireable_only",
        "offerable",
      ].forEach(filter => {
        if (name === filter) {
          filterState[name] = Boolean(value)
        }
      })

      delete state.reset

      return {
        ...state,
        ...filterState,
      }
    }

    /**
     * Unsetting a filter
     */
    case "UNSET": {
      const { name } = action.payload

      let filterState = {}

      if (name === "attribution_class") {
        filterState = {
          attribution_class: [],
        }
      }
      if (name === "major_periods") {
        filterState = {
          major_periods: [],
        }
      }
      if (name === "medium") {
        filterState = {
          medium: "*",
        }
      }
      if (name === "page") {
        filterState = {
          page: 1,
        }
      }

      ;[
        "acquireable",
        "at_auction",
        "color",
        "for_sale",
        "inquireable_only",
        "offerable",
        "partner_id",
      ].forEach(filter => {
        if (name === filter) {
          filterState[name] = null
        }
      })

      return {
        ...state,
        ...filterState,
      }
    }

    /**
     * Resetting filters back to their initial state
     */
    case "RESET": {
      return {
        ...initialArtworkFilterState,
        reset: true,
      }
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
