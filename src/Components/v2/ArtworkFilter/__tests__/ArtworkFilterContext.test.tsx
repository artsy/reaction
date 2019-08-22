import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import {
  ArtworkFilterContextProvider,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"

describe("ArtworkFilterContext", () => {
  let context

  const getWrapper = (props = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...props}>
        <TestComponent />
      </ArtworkFilterContextProvider>
    )
  }

  const TestComponent = () => {
    context = useArtworkFilterContext()
    return null
  }

  it("boots with default filters", async () => {
    getWrapper()
    expect(context.filters).toEqual(initialArtworkFilterState)
  })

  it("takes a custom ZeroState", () => {
    const ZeroState = () => <div />
    getWrapper({ ZeroState })
    expect(context.ZeroState).toEqual(ZeroState)
  })

  describe("behaviors", () => {
    it("#onArtworkBrickClick", () => {
      const spy = jest.fn()
      getWrapper({ onArtworkBrickClick: spy })
      context.onArtworkBrickClick()
      expect(spy).toHaveBeenCalled()
    })

    it("#onFilterClick", () => {
      const spy = jest.fn()
      getWrapper({ onFilterClick: spy })
      context.onFilterClick("color", "purple", initialArtworkFilterState)
      expect(spy).toHaveBeenCalledWith(
        "color",
        "purple",
        initialArtworkFilterState
      )
    })

    it("#hasFilters", done => {
      getWrapper()
      expect(context.hasFilters).toBe(false)
      act(() => {
        context.setFilter("page", 10)
        setImmediate(() => {
          expect(context.hasFilters).toBe(true)
          done()
        })
      })
    })

    it("#isDefaultValue", () => {
      getWrapper()
      expect(context.isDefaultValue("height")).toEqual(true)
    })

    it("#rangeToTuple", () => {
      getWrapper()
      expect(context.rangeToTuple("height")).toEqual([1, 120])
    })

    it("#setFilter", done => {
      getWrapper()
      act(() => {
        context.setFilter("page", 10)
        setImmediate(() => {
          expect(context.filters.page).toEqual(10)
          done()
        })
      })
    })

    it("resets page back to zero on filter change", done => {
      getWrapper()
      act(() => {
        context.setFilter("page", 10)
        setImmediate(() => {
          expect(context.filters.page).toEqual(10)
          act(() => {
            context.setFilter("sort", "-foo")
            setImmediate(() => {
              expect(context.filters.page).toEqual(1)
              done()
            })
          })
        })
      })
    })

    it("#unsetFilter", done => {
      getWrapper()
      act(() => {
        context.setFilter("page", 10)
        setImmediate(() => {
          expect(context.filters.page).toEqual(10)
          act(() => {
            context.unsetFilter("page", 10)
            setImmediate(() => {
              expect(context.filters.page).toEqual(1)
              done()
            })
          })
        })
      })
    })

    it("#resetFilters", () => {
      getWrapper({
        filters: {
          ...initialArtworkFilterState,
          acquireable: true,
          at_auction: true,
        },
      })
      expect(context.filters.acquireable).toEqual(true)
      expect(context.filters.at_auction).toEqual(true)

      act(() => {
        context.resetFilters()
        setImmediate(() => {
          expect(context.filters).toEqual(initialArtworkFilterState)
        })
      })
    })
  })
})
