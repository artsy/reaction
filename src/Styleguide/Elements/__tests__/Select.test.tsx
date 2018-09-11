import { selectProps } from "Apps/__test__/Fixtures/Select"
import { Boot } from "Artsy/Router"
import { mount } from "enzyme"
import React from "react"
import { LargeSelect, Select, SmallSelect } from "../Select"

type Breakpoint = "xl" | "lg" | "md" | "sm" | "xs"

const ProvideSize: React.SFC<{ size: Breakpoint }> = ({ size, children }) => {
  const Boot_unsafe = Boot as any
  return (
    <Boot_unsafe initialMatchingMediaQueries={[size]}>{children}</Boot_unsafe>
  )
}

describe("Select", () => {
  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <ProvideSize size={"xs"}>
        <Select {...selectProps} />
      </ProvideSize>
    )
    expect(small.find(LargeSelect).length).toEqual(1) // Inverted

    const large = mount(
      <ProvideSize size={"lg"}>
        <Select {...selectProps} />
      </ProvideSize>
    )
    expect(large.find(SmallSelect).length).toEqual(1)
    expect(small.find("option").length).toBe(3)
    expect(large.find("option").length).toBe(3)
  })

  it("triggers callback on change", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ProvideSize size={"xs"}>
        <Select {...selectProps} onSelect={spy} />
      </ProvideSize>
    )
    wrapper
      .find("option")
      .at(1)
      .simulate("change")
    expect(spy).toHaveBeenCalled()
  })
})
