import { Radio } from "@artsy/palette"
import { SystemContextProvider } from "Artsy"
import { mount } from "enzyme"
import React from "react"
import { FilterState, initialState } from "../../../FilterState"
import { MediumFilter } from "../MediumFilter"

describe("MediumFilter", () => {
  const tracking = { trackEvent: jest.fn() }
  const filterState = new FilterState({ ...initialState, tracking })
  const mediums = [
    { id: "photography", name: "photography" },
    { id: "print", name: "print" },
    { id: "painting", name: "painting" },
    { id: "design", name: "design" },
  ]
  const mediator = { trigger: jest.fn() }

  const mediumFilter = (mediumProps = []) => {
    return mount(
      <SystemContextProvider mediator={mediator}>
        <MediumFilter filters={filterState} mediums={mediumProps} />
      </SystemContextProvider>
    )
  }

  it("displays the correct number of Radio components", () => {
    const component = mediumFilter(mediums)
    expect(component.find(Radio).length).toBe(4)
  })

  it("Uses hardcoded mediums if none are returned", () => {
    const component = mediumFilter()
    expect(component.find(Radio).length).toBe(11)
  })

  it("updates the state with the correct medium", done => {
    const component = mediumFilter(mediums)
    component
      .find(Radio)
      .at(0)
      .simulate("click")

    component.update()

    setTimeout(() => {
      expect(filterState.state.medium).toBe("photography")
      done()
    }, 10)
  })
})
