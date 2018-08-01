import { mount } from "enzyme"
import React from "react"
import { Join } from "../Join"

describe("Join", () => {
  it("renders a separator", () => {
    const wrapper = mount(
      <div>
        <Join separator={<div className="foundSeparator">,</div>}>
          <div>hi</div>
          <div>how</div>
          <div>are</div>
          <div>you</div>
        </Join>
      </div>
    )

    expect(wrapper.text()).toEqual("hi,how,are,you")
    expect(wrapper.html()).toContain("foundSeparator")
  })
})
