import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { Provider } from "unstated"
import { FilterState } from "../../../FilterState"
import { FilterContainer } from "../FilterContainer"
import { SortFilter } from "../SortFilter"
import { SortTypes } from "../SortFilterSortTypes"

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

  describe("passes the `sortType` prop to SortFilter", () => {
    const buildWrapper = ({ mobile = false, collection = false }) =>
      mount(
        <MockBoot breakpoint={mobile ? "xs" : "lg"}>
          <Provider inject={[filterState]}>
            <FilterContainer
              mediums={mediums}
              user={user}
              sortType={collection ? SortTypes.collection : undefined}
            >
              {filters => {
                return <div />
              }}
            </FilterContainer>
          </Provider>
        </MockBoot>
      )

    it("when unspecified, SortFilter uses 'default'", () => {
      const mobileDefault = buildWrapper({ mobile: true })
      const desktopDefault = buildWrapper({ mobile: false })

      const mobileSortFilter = mobileDefault.find(SortFilter)
      const desktopSortFilter = desktopDefault.find(SortFilter)

      expect(mobileSortFilter.props().sortType).toBe(SortTypes.default)
      expect(desktopSortFilter.props().sortType).toBe(SortTypes.default)
    })

    it("on mobile", () => {
      const mobileCollections = buildWrapper({
        mobile: true,
        collection: true,
      })
      const mobileSortFilter = mobileCollections.find(SortFilter)
      expect(mobileSortFilter.props().sortType).toBe(SortTypes.collection)
    })

    it("on desktop", () => {
      const desktopCollections = buildWrapper({
        mobile: false,
        collection: true,
      })
      const desktopSortFilter = desktopCollections.find(SortFilter).at(0)
      expect(desktopSortFilter.props().sortType).toBe(SortTypes.collection)
    })
  })
})
