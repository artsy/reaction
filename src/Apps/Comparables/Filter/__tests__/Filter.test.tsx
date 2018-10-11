import { Radio } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { FilterState, initialState } from "../../../Collect/FilterState"
import { MediumFilter } from "../MediumFilter"

describe("Filter", () => {
  describe("MediumFilter", () => {
    const tracking = { trackEvent: jest.fn() }
    const filterState = new FilterState({ ...initialState })
    const mediator = { trigger: jest.fn() }

    const mediumFilter = mount(
      <MediumFilter filters={filterState} mediator={mediator} />
    )

    it("displays the correct number of Radio components", () => {
      expect(mediumFilter.find(Radio).length).toBe(4)
    })

    it("updates the state with the correct medium", done => {
      mediumFilter
        .find(Radio)
        .at(0)
        .simulate("click")

      mediumFilter.update()

      setTimeout(() => {
        expect(filterState.state.medium).toBe("photography")
        done()
      })
    })
  })
})
