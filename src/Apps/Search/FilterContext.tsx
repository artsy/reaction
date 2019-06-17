import React, {
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react"

export interface FilterContextValues {
  setFilter: Dispatch<{ type: string; payload: any }>
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

interface Filters {
  page: number
  keyword?: string
  medium?: string
}

const filterReducer: (
  state: Filters,
  action: { type: string; payload: any }
) => Filters = (state, action) => {
  switch (action.type) {
    case "page":
      return { ...state, page: action.payload }
    case "medium":
      return { ...state, medium: action.payload }
    default:
      throw new Error("Unexpected action")
  }
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
    setFilter: dispatch,
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
