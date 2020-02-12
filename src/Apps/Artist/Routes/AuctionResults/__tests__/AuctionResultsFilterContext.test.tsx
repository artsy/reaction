import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import {
  AuctionResultsFilterContextProvider,
  initialAuctionResultsFilterState,
  useAuctionResultsFilterContext,
} from "../AuctionResultsFilterContext"

describe("AuctionResultsFilterContext", () => {
  let context: ReturnType<typeof useAuctionResultsFilterContext>

  const getWrapper = (props = {}) => {
    return mount(
      <AuctionResultsFilterContextProvider {...props}>
        <TestComponent />
      </AuctionResultsFilterContextProvider>
    )
  }

  const TestComponent = () => {
    context = useAuctionResultsFilterContext()
    return null
  }

  it("boots with default filters", async () => {
    getWrapper()
    expect(context.filters).toEqual(initialAuctionResultsFilterState)
  })

  describe("behaviors", () => {
    it("#onAuctionResultClick changes openItemIndex", () => {
      context.onAuctionResultClick(2)
      expect(context.filters.openedItemIndex).toBe(2)
    })

    // it("#onFilterClick", () => {
    //   const spy = jest.fn()
    //   getWrapper({ onFilterClick: spy })
    //   context.onFilterClick("color", "purple", initialAuctionResultsFilterState)
    //   expect(spy).toHaveBeenCalledWith(
    //     "color",
    //     "purple",
    //     initialAuctionResultsFilterState
    //   )
    // })

    it("#setFilter", done => {
      getWrapper()
      act(() => {
        context.setFilter("page", 10)
        setTimeout(() => {
          expect(context.filters.page).toEqual(10)
          done()
        })
      })
    })

    it("#setFilter resets pagination", done => {
      getWrapper({
        filters: {
          page: 10,
        },
      })
      act(() => {
        expect(context.filters.page).toEqual(10)
        context.setFilter("sort", "relevant")
        setTimeout(() => {
          expect(context.filters.page).toEqual(1)
          done()
        })
      })
    })

    it("#unsetFilter", done => {
      getWrapper()
      act(() => {
        context.setFilter("page", 10)
        setTimeout(() => {
          expect(context.filters.page).toEqual(10)
          act(() => {
            context.unsetFilter("page")
            setTimeout(() => {
              expect(context.filters.page).toEqual(1)
              done()
            })
          })
        })
      })
    })

    it("#unsetFilter resets pagination", done => {
      getWrapper({
        filters: {
          page: 10,
          sort: "relevant",
        },
      })
      act(() => {
        expect(context.filters.page).toEqual(10)
        context.unsetFilter("sort")
        setTimeout(() => {
          expect(context.filters.page).toEqual(1)
          done()
        })
      })
    })

    it("#resetFilters", () => {
      getWrapper({
        filters: {
          ...initialAuctionResultsFilterState,
          organizations: [],
        },
      })
      expect(context.filters.organizations).toEqual([])

      act(() => {
        context.resetFilters()
        setTimeout(() => {
          expect(context.filters).toEqual(initialAuctionResultsFilterState)
        })
      })
    })
  })
})
