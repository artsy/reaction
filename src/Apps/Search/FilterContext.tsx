import React, { FC, ReactNode, useContext, useEffect, useReducer } from "react"
import { filterReducer } from "./filterReducer"

export interface FilterContextValues {
  setFilter: (name: string, value: any) => void
  hasFilters: boolean
  filters: Filters
}

interface FilterContextProps {
  children: ReactNode
  keyword?: string
  page?: number
  medium?: string
}

export const FilterContext = React.createContext<FilterContextValues>({
  filters: {
    page: 1,
  },
  setFilter() {
    console.error("Shouldn't have gotten here.")
  },
  hasFilters: false,
})

export interface Filters {
  page: number
  keyword?: string
  medium?: string
}

export const FilterContextProvider: FC<FilterContextProps> = ({
  children,
  keyword,
  page: initialPage = 1,
  medium: initialMedium = "",
}) => {
  const initialFilters: Filters = {
    page: initialPage,
    keyword,
    medium: initialMedium,
  }

  const [state, dispatch] = useReducer(filterReducer, initialFilters)

  useEffect(() => {
    // TODO - do this correctly.
    console.log("page changed; push history here.")
  }, [state.page])

  const value = {
    filters: state,
    hasFilters: state.page !== 1,
    setFilter: (name, val) =>
      dispatch({ type: "set", payload: { name, value: val } }),
  }
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
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
