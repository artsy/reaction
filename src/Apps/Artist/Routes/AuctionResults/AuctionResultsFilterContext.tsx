import { isDefaultFilter } from "Components/v2/ArtworkFilter/Utils/isDefaultFilter"
import { rangeToTuple } from "Components/v2/ArtworkFilter/Utils/rangeToTuple"
import React, { useContext, useReducer } from "react"

export interface AuctionResultsFilters {
  // organization?: string[]
  openedItemIndex: number
  page?: number
  sort?: string
}

interface AuctionResultsFiltersState extends AuctionResultsFilters {
  reset?: boolean
}
/**
 * Initial filter state
 */
export const initialAuctionResultsFilterState: AuctionResultsFilters = {
  // organization: [],
  openedItemIndex: -1,
  page: 1,
  sort: "DATE_DESC",
}

export interface AuctionResultsFilterContextProps {
  filters?: AuctionResultsFilters
  onChange?: (filterState) => void
  setFilter: (name: keyof AuctionResultsFilters, value: any) => void
  onAuctionResultClick?: (index: number) => void
}

/**
 * Context behavior shared globally across the AuctionResultsFilter component tree
 */
export const AuctionResultsFilterContext = React.createContext<
  AuctionResultsFilterContextProps
>({
  filters: initialAuctionResultsFilterState,
  setFilter: null,
  onAuctionResultClick: null,
})

export type SharedAuctionResultsFilterContextProps = Pick<
  AuctionResultsFilterContextProps,
  "filters" | "onAuctionResultClick"
  // | "sortOptions"
  // | "onFilterClick"
  // | "ZeroState"
> & {
  onChange?: (filterState) => void
}

export const AuctionResultsFilterContextProvider: React.FC<SharedAuctionResultsFilterContextProps & {
  children: React.ReactNode
}> = ({
  children,
  // counts = {},
  filters = {},
  onAuctionResultClick,
  // onChange,
  // onFilterClick,
  // sortOptions,
  // ZeroState,
}) => {
  const initialFilterState = {
    ...initialAuctionResultsFilterState,
    ...filters,
  }

  console.log("initialFilterState", initialFilterState, filters)

  const [AuctionResultsFilterState, dispatch] = useReducer(
    AuctionResultsFilterReducer,
    initialFilterState
  )

  // useDeepCompareEffect(() => {
  //   if (onChange) {
  //     onChange(omit(AuctionResultsFilterState, ["reset"]))
  //   }
  // }, [AuctionResultsFilterState])

  const auctionResultsFilterContext = {
    filters: AuctionResultsFilterState,
    // hasFilters: hasFilters(AuctionResultsFilterState),

    // Handlers
    onAuctionResultClick: index => {
      dispatch({
        type: "SET",
        payload: {
          name: "openedItemIndex",
          value: index,
        },
      })
    },
    // onFilterClick,

    // sortOptions,

    // Components
    // ZeroState,

    // Filter manipulation
    isDefaultValue: field => {
      return isDefaultFilter(field, AuctionResultsFilterState[field])
    },

    rangeToTuple: range => {
      return rangeToTuple(AuctionResultsFilterState, range)
    },

    setFilter: (name, val) => {
      // if (onFilterClick) {
      //   onFilterClick(name, val, { ...AuctionResultsFilterState, [name]: val })
      // }
      console.log("set filter", name, val)

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

  console.log("auctionResultsFilterContext !!!", auctionResultsFilterContext)

  return (
    <AuctionResultsFilterContext.Provider value={auctionResultsFilterContext}>
      {children}
    </AuctionResultsFilterContext.Provider>
  )
}

const AuctionResultsFilterReducer = (
  state: AuctionResultsFiltersState,
  action: {
    type: "SET" | "UNSET" | "RESET"
    payload: { name: keyof AuctionResultsFilters; value?: any }
  }
): AuctionResultsFiltersState => {
  console.log("reducer", action)
  switch (action.type) {
    /**
     * Setting  and updating filters
     */
    case "SET": {
      const { name, value } = action.payload

      const filterState: AuctionResultsFilters = {
        page: 1,
        openedItemIndex: -1,
      }

      // if (name === "organization") {
      //   filterState = {
      //     organization: value ? [value] : [],
      //   }
      // }

      // primitive filter types
      const primitiveFilterTypes: Array<keyof AuctionResultsFilters> = [
        "sort",
        "openedItemIndex",
      ]
      primitiveFilterTypes.forEach(filter => {
        console.log("string filter", filter)
        if (name === filter) {
          filterState[name as any] = value
        }
      })

      // // Boolean filter types
      // const booleanFilterTypes: Array<keyof AuctionResultsFilters> = [

      // ]
      // booleanFilterTypes.forEach(filter => {
      //   if (name === filter) {
      //     filterState[name as any] = Boolean(value)
      //   }
      // })

      // delete state.reset

      return {
        ...state,
        ...filterState,
      }
    }

    /**
     * Unsetting a filter
     */
    case "UNSET": {
      // const { name } = action.payload as { name: keyof AuctionResultsFilters }

      const filterState: AuctionResultsFilters = {
        page: 1,
        openedItemIndex: -1,
      }

      // if (name === "organization") {
      //   filterState = {
      //     organization: [],
      //   }
      // }

      // const filters: Array<keyof AuctionResultsFilters> = [
      //   "acquireable",
      //   "atAuction",
      //   "color",
      //   "forSale",
      //   "inquireableOnly",
      //   "offerable",
      //   "partnerID",
      // ]
      // filters.forEach(filter => {
      //   if (name === filter) {
      //     filterState[name as any] = null
      //   }
      // })

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
        ...initialAuctionResultsFilterState,
        // reset: true,
      }
    }

    default:
      return state
  }
}

/**
 * Hook to conveniently access fiter state context
 */
export const useAuctionResultsFilterContext = () => {
  const artworkFilterContext = useContext(AuctionResultsFilterContext)
  return artworkFilterContext
}
