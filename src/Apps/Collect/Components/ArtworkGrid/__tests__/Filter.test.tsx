import { Radio } from "@artsy/palette"
import { mount, render } from "enzyme"
import React from "react"
import { FilterState, initialState } from "../../../FilterState"
import { MediumRadios, TimePeriodRadios } from "../index"

describe("Filter", () => {
  describe("MediumRadios", () => {
    const tracking = { trackEvent: jest.fn() }
    const filterState = new FilterState({ ...initialState, tracking })
    const mediums = [
      { id: "photography" },
      { id: "print" },
      { id: "painting" },
      { id: "design" },
    ]
    const mediator = { trigger: jest.fn() }

    const mediumRadios = mount(
      <MediumRadios
        filters={filterState}
        mediums={mediums}
        mediator={mediator}
      />
    )

    it("displays the correct number of Radio components", () => {
      expect(mediumRadios.find(Radio).length).toBe(4)
    })

    it("updates the state with the correct medium", done => {
      mediumRadios
        .find(Radio)
        .at(0)
        .simulate("click")

      mediumRadios.update()

      setTimeout(() => {
        expect(filterState.state.medium).toBe("photography")
        done()
      })
    })

    it("updates correct medium", done => {
      mediumRadios
        .find(Radio)
        .at(1)
        .simulate("click")

      mediumRadios.update()

      setTimeout(() => {
        expect(
          mediumRadios
            .find(Radio)
            .at(0)
            .props().selected
        ).toBe(false)
        expect(
          mediumRadios
            .find(Radio)
            .at(2)
            .props().selected
        ).toBe(false)
        expect(
          mediumRadios
            .find(Radio)
            .at(3)
            .props().selected
        ).toBe(false)
        done()
      })
    })
  })

  describe("TimePeriodRadios", () => {
    const tracking = { trackEvent: jest.fn() }
    const filterState = new FilterState({ ...initialState, tracking })
    const mediator = { trigger: jest.fn() }
    const timePeriodRadios = mount(
      <TimePeriodRadios filters={filterState} mediator={mediator} />
    )

    it("displays the correct number o Radio components for Time Periods", () => {
      expect(timePeriodRadios.find(Radio).length).toBe(15)
    })

    it("updates the state with the correct time period", done => {
      timePeriodRadios
        .find(Radio)
        .at(0)
        .simulate("click")

      timePeriodRadios.update()

      setTimeout(() => {
        expect(filterState.state.major_periods[0]).toBe("2010")
        done()
      })
    })

    it("updates the correct time period", done => {
      timePeriodRadios
        .find(Radio)
        .at(1)
        .simulate("click")

      timePeriodRadios.update()
      setTimeout(() => {
        expect(
          timePeriodRadios
            .find(Radio)
            .at(0)
            .props().selected
        ).toBe(false)
        expect(
          timePeriodRadios
            .find(Radio)
            .at(2)
            .props().selected
        ).toBe(false)
        expect(
          timePeriodRadios
            .find(Radio)
            .at(3)
            .props().selected
        ).toBe(false)
        done()
      })
    })
  })
})
