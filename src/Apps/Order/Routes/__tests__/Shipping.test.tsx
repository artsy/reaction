import { mount, shallow } from "enzyme"
import React from "react"
import { commitMutation, RelayProp } from "react-relay"

import { Button } from "@artsy/palette"
import { UntouchedOrder } from "Apps/__test__/Fixtures/Order"
import Input, { InputProps } from "Components/Input"
import { Dismiss } from "Components/Modal/ErrorModal"
import { Provider } from "unstated"
import { CountrySelect } from "../../../../Styleguide/Components"
import { Address, AddressFields } from "../../Components/AddressFields"
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
  const validAddress: Address = {
    name: "Artsy UK Ltd",
    addressLine1: "14 Gower's Walk",
    addressLine2: "Suite 2.5, The Loom",
    city: "Whitechapel",
    region: "London",
    postalCode: "E1 8PY",
    country: "UK",
    phoneNumber: "8475937743",
  }
  const fillInput = (component, name, val, inputType = Input) => {
    const input = component
      .find(inputType)
      .filterWhere(wrapper => wrapper.props().name === name)
    input.getDOMNode().value = val
    input.simulate("change")
  }

  const fillCountrySelect = (component, name, val) => {
    fillInput(component, name, val, CountrySelect)
  }

  const fillAddressForm = (component, values: Partial<Address>) => {
    const { country: countryVal, ...inputVals } = values
    Object.keys(inputVals).forEach(name =>
      fillInput(component, name, inputVals[name])
    )
    countryVal && fillCountrySelect(component, "country", countryVal)
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
      // console.error = jest.fn() // Silences component logging.
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

    it("shows an error modal when there is an error from the server", () => {
      const component = getWrapper(testProps)
      expect(component.find("ErrorModal").props().show).toBe(false)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(settingOrderShipmentFailure)
      )
      component.find("Button").simulate("click")
      expect(component.find("ErrorModal").props().show).toBe(true)

      component.find(Dismiss).simulate("click")
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

      component.find(Dismiss).simulate("click")
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
        .filterWhere(wrapper => (wrapper.props() as InputProps).name === "name")
      expect((input.props() as InputProps).value).toBe(
        testProps.order.requestedFulfillment.name
      )
    })

    it.only("includes already-filled-in data in mutation if re-sent", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce((_environment, config) => {
        console.log("***********")
        expect(config.variables.input.shipping.name).toBe("Dr Collector")
      })

      console.log("????????", component.find(AddressFields).props().values)
      fillAddressForm(component, validAddress)
      component.update()
      console.log("????????", component.find(AddressFields).props().values)
      component.find(Button).simulate("click")

      expect.hasAssertions()
    })
  })

  // describe("#validate", () => {
  //   xit("validates address if SHIP is selected", () => {
  //     const wrapper = getWrapper(testProps)
  //     // console.log("??????????????", wrapper.instance())
  //     const component = wrapper.find("ShippingRoute").instance()
  //     console.log("????????????", component)
  //     //   const result = ShippingRoute.prototype.validateAddress({
  //     //     shippingOption: "SHIP",
  //     //   })
  //     //   expect(Object.keys(result).length).not.toEqual(0)
  //   })
  // })

  // describe("#onContinue", () => {
  //   xit("sets the submitting state on an error", () => {
  //     expect(false).toBe(true)
  //   })
  // })
})
