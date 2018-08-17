import { selectProps } from "Apps/__test__/Fixtures/Select"
import { mount } from "enzyme"
import React from "react"
import { Boot } from "Router"
import { LargeSelect, Select, SmallSelect } from "../Select"

describe("Select", () => {
  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <Select {...selectProps} />
      </Boot>
    )
    expect(small.find(LargeSelect).length).toEqual(1) // Inverted

    const large = mount(
      <Boot initialMatchingMediaQueries={["lg"]}>
        <Select {...selectProps} />
      </Boot>
    )
    expect(large.find(SmallSelect).length).toEqual(1)
    expect(small.find("option").length).toBe(3)
    expect(large.find("option").length).toBe(3)
  })

  it("triggers callback on change", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <Select {...selectProps} onSelect={spy} />
      </Boot>
    )
    wrapper
      .find("option")
      .at(1)
      .simulate("change")
    expect(spy).toHaveBeenCalled()
  })
})
