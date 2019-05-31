import { mount } from "enzyme"
import React from "react"
import { FilterState, initialState } from "../../../FilterState"
import { SortFilter } from "../SortFilter"

describe("SortFilter", () => {
  let filterState

  beforeEach(() => {
    filterState = new FilterState(initialState)
    filterState.setFilter = jest.fn()
  })

  const expect_options = (wrapper, values) => {
    const options = wrapper.find("option")
    expect(options.length).toBe(values.length)
    values.forEach((value, index) => {
      expect(options.at(index).props().value).toBe(value)
    })
  }

  it("maintains default behavior", () => {
    const wrapper = mount(<SortFilter filters={filterState} />)
    expect_options(wrapper, [
      "-decayed_merch",
      "-partner_updated_at",
      "-published_at",
      "-year",
      "year",
    ])
  })

  it("adds sort-by-price if and only if isCollection is ture", () => {
    const wrapper = mount(<SortFilter filters={filterState} isCollection />)
    expect_options(wrapper, [
      "-decayed_merch",
      "-prices",
      "prices",
      "-partner_updated_at",
      "-published_at",
      "-year",
      "year",
    ])
  })
})
