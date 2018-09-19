import { mount } from "enzyme"
import React from "react"
import { commitMutation, RelayProp } from "react-relay"

import { Button, RadioGroup } from "@artsy/palette"
import { UntouchedOrder } from "Apps/__test__/Fixtures/Order"
import Input, { InputProps } from "Components/Input"
import { ModalButton } from "Components/Modal/ErrorModal"
import { cloneDeep } from "lodash"
import { Provider } from "unstated"
import {
  settingOrderShipmentFailure,
  settingOrderShipmentSuccess,
} from "../__fixtures__/MutationResults"
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
      requestedFulfillment: undefined,
    } as any
  })

  it("removes radio group if pickup_available flag is false", () => {
    const testPropWithShipOnlyOrder = cloneDeep(testProps)
    testPropWithShipOnlyOrder.order.lineItems.edges[0].node.artwork.pickup_available = false
    const component = getWrapper(testPropWithShipOnlyOrder)
    expect(component.find(RadioGroup).length).toEqual(0)
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
    beforeEach(() => {
      console.error = jest.fn() // Silences component logging.
      commitMutation.mockReset()
    })

    it("routes to payment screen after mutation completes", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(settingOrderShipmentSuccess)
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

    it("shows an error modal when there is an error from the server", () => {
      const component = getWrapper(testProps)
      expect(component.find("ErrorModal").props().show).toBe(false)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(settingOrderShipmentFailure)
      )
      component.find("Button").simulate("click")
      expect(component.find("ErrorModal").props().show).toBe(true)

      component.find(ModalButton).simulate("click")
      expect(component.find("ErrorModal").props().show).toBe(false)
    })

    it("shows an error modal when there is a network error", () => {
      const component = getWrapper(testProps)
      expect(component.find("ErrorModal").props().show).toBe(false)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce((_, { onError }) =>
        onError(new TypeError("Network request failed"))
      )
      component.find("Button").simulate("click")
      expect(component.find("ErrorModal").props().show).toBe(true)

      component.find(ModalButton).simulate("click")
      expect(component.find("ErrorModal").props().show).toBe(false)
    })
  })

  describe("with previously filled-in data", () => {
    beforeEach(() => {
      testProps.order.requestedFulfillment = {
        __typename: "Ship",
        name: "Dr Collector",
      }
    })
    it("includes already-filled-in data if available", () => {
      const component = getWrapper(testProps)

      const input = component
        .find(Input)
        .filterWhere(
          wrapper => (wrapper.props() as InputProps).title === "Full name"
        )

      expect((input.props() as InputProps).defaultValue).toBe(
        testProps.order.requestedFulfillment.name
      )
    })

    it("includes already-filled-in data in mutation if re-sent", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce((_environment, config) => {
        expect(config.variables.input.shipping.name).toBe("Dr Collector")
      })

      component.find(Button).simulate("click")

      expect.hasAssertions()
    })
  })
})
