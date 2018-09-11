import { selectProps } from "Apps/__test__/Fixtures/Select"
import { mount } from "enzyme"
import React from "react"
import { MockBoot } from "Utils/MockBoot"
import { LargeSelect, Select, SmallSelect } from "../Select"

describe("Select", () => {
  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <MockBoot breakpoint={"xs"}>
        <Select {...selectProps} />
      </MockBoot>
    )
    expect(small.find(LargeSelect).length).toEqual(1) // Inverted

    const large = mount(
      <MockBoot breakpoint={"lg"}>
        <Select {...selectProps} />
      </MockBoot>
    )
    expect(large.find(SmallSelect).length).toEqual(1)
    expect(small.find("option").length).toBe(3)
    expect(large.find("option").length).toBe(3)
  })

  it("triggers callback on change", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MockBoot breakpoint={"xs"}>
        <Select {...selectProps} onSelect={spy} />
      </MockBoot>
    )
    wrapper
      .find("option")
      .at(1)
      .simulate("change")
    expect(spy).toHaveBeenCalled()
  })
})
