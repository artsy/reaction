import { mount } from "enzyme"
import React from "react"
import { Radio } from "../Radio"
import { RadioGroup } from "../RadioGroup"

describe("RadioGroup", () => {
  it("renders a radio group", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <RadioGroup onSelect={spy}>
        <Radio value="SHIP">Provide shipping address</Radio>
        <Radio value="PICKUP">Arrange for pickup</Radio>
      </RadioGroup>
    )

    expect(wrapper.text()).toContain("Provide shipping address")
    expect(wrapper.text()).toContain("Arrange for pickup")

    wrapper
      .find("Radio")
      .first()
      .simulate("click")

    expect(spy).toHaveBeenCalled()
  })

  it("renders default value on mount", () => {
    const wrapper = mount(
      <RadioGroup defaultValue="PICKUP">
        <Radio value="SHIP">Provide shipping address</Radio>
        <Radio value="PICKUP">Arrange for pickup</Radio>
      </RadioGroup>
    )

    expect(
      wrapper
        .find("Radio")
        .first()
        .props().selected
    ).toBe(false)
    expect(
      wrapper
        .find("Radio")
        .last()
        .props().selected
    ).toBe(true)
  })

  it("selects the radio that gets clicked", () => {
    const wrapper = mount(
      <RadioGroup defaultValue="PICKUP">
        <Radio value="SHIP">Provide shipping address</Radio>
        <Radio value="PICKUP">Arrange for pickup</Radio>
      </RadioGroup>
    )

    wrapper
      .find("Radio")
      .first()
      .simulate("click")

    expect(
      wrapper
        .find("Radio")
        .first()
        .props().selected
    ).toBe(true)
    expect(
      wrapper
        .find("Radio")
        .last()
        .props().selected
    ).toBe(false)
  })

  it("allows the 'disabled' prop on the Radio component to take the precedence", () => {
    const wrapper = mount(
      <RadioGroup disabled>
        <Radio value="SHIP" disabled={false}>
          Provide shipping address
        </Radio>
        <Radio value="PICKUP">Arrange for pickup</Radio>
      </RadioGroup>
    )

    expect(
      wrapper
        .find("Radio")
        .first()
        .props().disabled
    ).toBe(false)
    expect(
      wrapper
        .find("Radio")
        .last()
        .props().disabled
    ).toBe(true)
  })

  it("ignores the 'selected' prop on the Radio component", () => {
    const wrapper = mount(
      <RadioGroup defaultValue="PICKUP">
        <Radio value="SHIP" selected>
          Provide shipping address
        </Radio>
        <Radio value="PICKUP">Arrange for pickup</Radio>
      </RadioGroup>
    )

    const ship = wrapper.find("Radio").first()

    expect(ship.props().selected).toBe(false)

    const pickup = wrapper.find("Radio").last()

    expect(pickup.props().selected).toBe(true)
  })

  it("allows for using the onSelect callback both on RadioGroup and Radio", () => {
    const spyOnRadioGroup = jest.fn()
    const spyOnRadio = jest.fn()

    const wrapper = mount(
      <RadioGroup onSelect={spyOnRadioGroup}>
        <Radio value="SHIP" onSelect={spyOnRadio}>
          Provide shipping address
        </Radio>
        <Radio value="PICKUP">Arrange for pickup</Radio>
      </RadioGroup>
    )

    wrapper
      .find("Radio")
      .first()
      .simulate("click")

    expect(spyOnRadioGroup).toHaveBeenCalled()
    expect(spyOnRadio).toHaveBeenCalled()
  })
})
