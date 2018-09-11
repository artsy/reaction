import { mount } from "enzyme"
import React from "react"
import { commitMutation, RelayProp } from "react-relay"

import { Button, Radio } from "@artsy/palette"
import { UntouchedOrder } from "Apps/__test__/Fixtures/Order"
import Input from "Components/Input"
import { Provider } from "unstated"
import { ShippingProps, ShippingRoute } from "../Shipping"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("Shipping", () => {
  const getWrapper = someProps => {
    return mount(
      <Provider>
        <ShippingRoute {...someProps} />
      </Provider>
    )
  }

  let testProps: ShippingProps
  beforeEach(() => {
    testProps = {
      order: { ...UntouchedOrder, id: "1234" },
      relay: { environment: {} } as RelayProp,
      router: { push: jest.fn() },
    } as any
  })

  it("commits the mutation with the orderId", () => {
    const component = getWrapper(testProps)
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce((_environment, config) => {
      expect(config.variables.input.orderId).toBe("1234")
    })

    component.find("Button").simulate("click")

    expect.hasAssertions()
  })

  it("commits the mutation with shipping option", () => {
    const component = getWrapper(testProps)
    const input = component
      .find(Input)
      .filterWhere(
        wrapper => wrapper.props().title === "State, province, or region"
      )
      .find("input")
    // https://github.com/airbnb/enzyme/issues/218#issuecomment-388481390
    input.getDOMNode().value = "New Brunswick"
    input.simulate("change")

    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce((_environment, config) => {
      expect(config.variables.input.shipping.region).toBe("New Brunswick")
      expect(config.variables.input.shipping.country).toBe("US") // It defaults to "US" when not selected
    })

    component.find("Button").simulate("click")

    expect.hasAssertions()
  })

  it("commits the mutation with pickup option", () => {
    const component = getWrapper(testProps)
    component
      .find("Radio")
      .last()
      .simulate("click")
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce((_environment, config) => {
      expect(config.variables.input.fulfillmentType).toBe("PICKUP")
    })

    component.find("Button").simulate("click")

    expect.hasAssertions()
  })

  describe("mutation", () => {
    it("routes to payment screen after mutation completes", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted()
        }
      )

      component.find("Button").simulate("click")

      expect(testProps.router.push).toHaveBeenCalledWith("/order2/1234/payment")
    })

    it("shows the button spinner while loading the mutation", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(() => {
        const buttonProps = component
          .update() // We need to wait for the component to re-render
          .find("Button")
          .props() as any
        expect(buttonProps.loading).toBeTruthy()
      })

      component.find("Button").simulate("click")

      expect.hasAssertions()
    })
  })
})
