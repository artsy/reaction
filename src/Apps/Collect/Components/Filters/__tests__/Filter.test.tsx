import { Radio } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { FilterState, initialState } from "../../../FilterState"
import { MediumFilter } from "../MediumFilter"
import { TimePeriodFilter } from "../TimePeriodFilter"

describe("Filter", () => {
  describe("MediumFilter", () => {
    const tracking = { trackEvent: jest.fn() }
    const filterState = new FilterState({ ...initialState, tracking })
    const mediums = [
      { id: "photography" },
      { id: "print" },
      { id: "painting" },
      { id: "design" },
    ]
    const mediator = { trigger: jest.fn() }

    const mediumFilter = mount(
      <MediumFilter
        filters={filterState}
        mediums={mediums}
        mediator={mediator}
      />
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

  describe("TimePeriodFilter", () => {
    const tracking = { trackEvent: jest.fn() }
    const filterState = new FilterState({ ...initialState, tracking })
    const mediator = { trigger: jest.fn() }
    const timePeriodFilter = mount(
      <TimePeriodFilter filters={filterState} mediator={mediator} />
    )

    it("displays the correct number o Radio components for Time Periods", () => {
      expect(timePeriodFilter.find(Radio).length).toBe(15)
    })

    it("updates the state with the correct time period", done => {
      timePeriodFilter
        .find(Radio)
        .at(0)
        .simulate("click")

      timePeriodFilter.update()

      setTimeout(() => {
        expect(filterState.state.major_periods[0]).toBe("2010")
        done()
      })
    })
  })
})
