import { mount } from "enzyme"
import React from "react"
import { commitMutation, RelayProp } from "react-relay"

import { Button } from "Styleguide/Elements/Button"
import { Radio } from "Styleguide/Elements/Radio"
import { Provider } from "unstated"
import { ShippingProps, ShippingRoute } from "../Shipping"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("Shipping", () => {
  const getWrapper = props => {
    return mount(
      <Provider>
        <ShippingRoute {...props} />
      </Provider>
    )
  }

  let props: ShippingProps
  beforeEach(() => {
    props = {
      order: {
        id: "1234",
      },
      relay: {
        environment: {},
      } as RelayProp,
    }
  })

  it("commits the mutation with the orderId", () => {
    const component = getWrapper(props)
    component
      .find(Radio)
      .last()
      .simulate("click")
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce((_environment, config) => {
      expect(config.variables.input.orderId).toBe("1234")
    })

    component.find(Button).simulate("click")

    expect.assertions(1)
  })

  it("commits the mutation with shipping option", () => {
    const component = getWrapper(props)
    component
      .find("input")
      .last()
      .simulate("change", { target: { value: "New Brunswick" } })
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce((_environment, config) => {
      expect(config.variables.input.shippingRegion).toBe("New Brunswick")
    })

    component.find(Button).simulate("click")

    expect.assertions(1)
  })

  it("commits the mutation with pickup option", () => {
    const component = getWrapper(props)
    component
      .find(Radio)
      .last()
      .simulate("click")
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce((_environment, config) => {
      expect(config.variables.input.fulfillmentType).toBe("PICKUP")
    })

    component.find(Button).simulate("click")

    expect.assertions(1)
  })
})
