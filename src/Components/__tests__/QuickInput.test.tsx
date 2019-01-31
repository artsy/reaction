import { mount } from "enzyme"
import React from "react"

import QuickInput from "../QuickInput"

describe("QuickInput", () => {
  it("renders a QuickInput", () => {
    const wrapper = mount(<QuickInput />)

    expect(wrapper.find("input").length).toEqual(1)
  })

  it("renders a QuickInput with metadata", () => {
    const rightAddOn = <div>right side</div>

    const wrapper = mount(
      <QuickInput
        error="an error"
        label="some label"
        note="a note"
        rightAddOn={rightAddOn}
      />
    )

    const actual = wrapper.text()
    expect(actual).toContain("a note")
    expect(actual).toContain("an error")
    expect(actual).toContain("some label")
    expect(actual).toContain("right side")
  })
})
