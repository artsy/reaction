import {
  FilterState,
  initialState,
} from "Apps/Collect2/Routes/Collect/FilterState"
import { mount } from "enzyme"
import React from "react"
import { SortFilter } from "../SortFilter"
import { getSortOptions, SortTypes } from "../SortFilterSortTypes"

describe("SortFilter", () => {
  let filterState

  beforeEach(() => {
    filterState = new FilterState(initialState)
    filterState.setFilter = jest.fn()
  })

  const expectOptions = (wrapper, values) => {
    const options = wrapper.find("option")
    expect(options.length).toBe(values.length)
    values.forEach((value, index) => {
      expect(options.at(index).props().value).toBe(value)
    })
  }

  describe("props.sortType", () => {
    it("uses default if unspecified", () => {
      const wrapper = mount(<SortFilter filters={filterState} />)
      const expectedOptions = getSortOptions(SortTypes.default)
      expectOptions(wrapper, expectedOptions.map(o => o.value))
    })

    it("respects `collection` sort type", () => {
      const wrapper = mount(
        <SortFilter filters={filterState} sortType={SortTypes.collection} />
      )
      const expectedOptions = getSortOptions(SortTypes.collection)
      expectOptions(wrapper, expectedOptions.map(o => o.value))
    })
  })
})
