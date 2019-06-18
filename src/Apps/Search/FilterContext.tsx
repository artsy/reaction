import React, { FC, ReactNode, useContext, useEffect, useReducer } from "react"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { filterReducer } from "./filterReducer"

export interface FilterContextValues {
  setFilter: (name: string, value: any) => void
  unsetFilter: (name: string) => void
  hasFilters: boolean
  filters: Filters
}

interface FilterContextProps {
  children: ReactNode
  keyword?: string
  page?: number
  medium?: string
  for_sale?: boolean
  offerable?: boolean
}

export const FilterContext = React.createContext<FilterContextValues>({
  filters: {
    page: 1,
  },
  setFilter() {
    console.error("Shouldn't have gotten here.")
  },
  unsetFilter() {
    console.error("Shouldn't have gotten here.")
  },
  hasFilters: false,
})

export interface Filters {
  page: number
  keyword?: string
  medium?: string
  for_sale?: boolean
  offerable?: boolean
}

export const FilterContextProvider: FC<FilterContextProps> = ({
  children,
  keyword,
  page = 1,
  medium = "",
  for_sale,
  offerable,
}) => {
  const initialFilters: Filters = {
    page,
    keyword,
    medium,
    for_sale,
    offerable,
  }

  const [state, dispatch] = useReducer(filterReducer, initialFilters)
  const isMounted = useDidMount()

  useEffect(() => {
    // TODO - do this correctly.
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
  }
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

// TODO - loop through object.keys
const hasFilters: (Filters) => boolean = state => {
  if (state.page !== 1 || state.medium || state.for_sale || state.offerable) {
    return true
  }
  return false
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
