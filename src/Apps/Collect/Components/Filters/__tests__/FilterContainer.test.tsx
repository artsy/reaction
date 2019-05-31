import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { Provider } from "unstated"
import { FilterState } from "../../../FilterState"
import { FilterContainer } from "../FilterContainer"
import { SortFilter } from "../SortFilter"

jest.mock("sharify", () => ({
  data: {
    NODE_ENV: "test",
  },
}))

describe("FilterContainer", () => {
  let filterState: FilterState = null
  let user = null

  const mediums = [
    { id: "photography", name: "Photography" },
    { id: "prints", name: "Prints" },
  ]

  beforeEach(() => {
    filterState = new FilterState({
      tracking: {
        trackEvent: jest.fn(),
      },
    })

    user = {
      lab_features: {
        includes: () => true,
      },
    }
  })

  it("renders mobile version", () => {
    const wrapper = mount(
      <MockBoot breakpoint="xs">
        <Provider inject={[filterState]}>
          <FilterContainer mediums={mediums} user={user}>
            {filters => {
              return <div />
            }}
          </FilterContainer>
        </Provider>
      </MockBoot>
    )

    wrapper.update()

    expect(wrapper.find("Mobile").length).toEqual(1)
    expect(wrapper.find("Desktop").length).toEqual(0)
  })

  it("renders desktop version", () => {
    const wrapper = mount(
      <MockBoot breakpoint="lg">
        <Provider inject={[filterState]}>
          <FilterContainer mediums={mediums} user={user}>
            {filters => {
              return <div />
            }}
          </FilterContainer>
        </Provider>
      </MockBoot>
    )

    wrapper.update()

    expect(wrapper.find("Mobile").length).toEqual(0)
    expect(wrapper.find("Desktop").length).toEqual(1)
  })

  describe("passes the `isCollections` prop to SortFilter", () => {
    const build_wrapper = ({ mobile = false, collection = false }) =>
      mount(
        <MockBoot breakpoint={mobile ? "xs" : "lg"}>
          <Provider inject={[filterState]}>
            <FilterContainer
              mediums={mediums}
              user={user}
              isCollection={collection}
            >
              {filters => {
                return <div />
              }}
            </FilterContainer>
          </Provider>
        </MockBoot>
      )

    it("defaults to false", () => {
      const mobile_default = build_wrapper({ mobile: true })
      const desktop_default = build_wrapper({ mobile: false })

      const mobile_sort_filter = mobile_default.find(SortFilter)
      const desktop_sort_filter = desktop_default.find(SortFilter)

      expect(mobile_sort_filter.props().isCollection).toBe(false)
      expect(desktop_sort_filter.props().isCollection).toBe(false)
    })

    it("on mobile", () => {
      const mobile_collections = build_wrapper({
        mobile: true,
        collection: true,
      })
      const mobile_sort_filter = mobile_collections.find(SortFilter)
      expect(mobile_sort_filter.props().isCollection).toBe(true)
    })

    it("on desktop", () => {
      const desktop_collections = build_wrapper({
        mobile: false,
        collection: true,
      })
      const desktop_sort_filter = desktop_collections.find(SortFilter).at(0)
      expect(desktop_sort_filter.props().isCollection).toBe(true)
    })
  })
})
