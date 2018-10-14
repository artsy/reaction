import { Radio } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { FilterState, initialState } from "../../../FilterState"
import { MediumFilter } from "../MediumFilter"

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
    <MediumFilter filters={filterState} mediums={mediums} mediator={mediator} />
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
