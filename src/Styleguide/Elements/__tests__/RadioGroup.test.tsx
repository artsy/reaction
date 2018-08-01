import { mount } from "enzyme"
import React from "react"
import { RadioGroup } from "../RadioGroup"

describe("RadioGroup", () => {
  const options = [
    { label: "Provide shipping address", id: "SHIP" },
    { label: "Arrange for pickup", id: "PICKUP" },
  ]

  it("renders a radio group", () => {
    const spy = jest.fn()
    const wrapper = mount(<RadioGroup onSelect={spy} options={options} />)
    expect(wrapper.text()).toContain("Provide shipping address")
    expect(wrapper.text()).toContain("Arrange for pickup")
    expect(wrapper.find("StyledRadio").length).toBe(2)
    wrapper
      .find("StyledRadio")
      .first()
      .simulate("click")
    expect(spy).toHaveBeenCalled()
  })

  it("renders default value on mount", () => {
    const wrapper = mount(
      <RadioGroup options={options} onSelect={x => x} defaultValue="PICKUP" />
    )
    expect(
      wrapper
        .find("StyledRadio")
        .last()
        .props().selected
    ).toBe(true)
  })

  it("renders custom radio button", () => {
    const wrapper = mount(
      <RadioGroup
        options={options}
        onSelect={x => x}
        renderRadio={() => (
          <div key={Math.random()} className="customRadio">
            found
          </div>
        )}
      />
    )
    expect(wrapper.find(".customRadio").length).toBe(2)
    expect(
      wrapper
        .find(".customRadio")
        .at(1)
        .text()
    ).toBe("found")
  })

  it("disables radio group", () => {
    const spy = jest.fn()
    const wrapper = mount(<RadioGroup onSelect={spy} options={options} />)
    const radio = wrapper.find("StyledRadio").at(1)
    radio.simulate("click")
    expect(radio.props().selected).toBe(false)
  })
})
