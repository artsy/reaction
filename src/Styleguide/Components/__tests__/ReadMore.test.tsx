import { mount } from "enzyme"
import React from "react"
import { ReadMore } from "../ReadMore2"

describe("ReadMore", () => {
  const copy =
    "Donald Judd regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa. Donald Judd, widely regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa."

  it("it truncates text", () => {
    const wrapper = cap => mount(<ReadMore maxChars={cap} text={copy} />)
    expect(wrapper(20).html()).toContain(">Donald Judd regarded<")
    expect(wrapper(Infinity).html()).toContain(copy)
    expect(wrapper(undefined).html()).toContain(copy)
  })

  it("expands text on click", () => {
    const wrapper = mount(<ReadMore maxChars={20} text={copy} />)
    expect(wrapper.find("ReadMoreLink").length).toBe(1)
    wrapper.simulate("click")
    expect(wrapper.find("ReadMoreLink").length).toBe(0)
  })
})
