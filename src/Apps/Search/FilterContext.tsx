import React, { FC, ReactNode, useContext, useEffect, useState } from "react"

export interface FilterContextValues {
  setPage: (page: number) => void
  hasFilters: boolean
  filters: {
    keyword?: string
    page: number
  }
}

interface FilterContextProps {
  children: ReactNode
  keyword?: string
  page?: number
}

export const FilterContext = React.createContext<FilterContextValues>({
  filters: {
    page: 1,
  },
  setPage() {
    console.error("Shouldn't have gotten here.")
  },
  hasFilters: false,
})

export const FilterContextProvider: FC<FilterContextProps> = ({
  children,
  keyword,
  page: initialPage = 1,
}) => {
  const [page, setPage] = useState(initialPage)

  useEffect(() => {
    // TODO - do this correctly.
    console.log("page changed; push history here.")
  }, [page])

  const value = {
    filters: {
      page,
      keyword,
    },
    setPage,
    hasFilters: page !== 1,
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
