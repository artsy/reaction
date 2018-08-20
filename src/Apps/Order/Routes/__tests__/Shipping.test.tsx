import { mount } from "enzyme"
import React from "react"
import { commitMutation, RelayProp } from "react-relay"

import { UntouchedOrder } from "Apps/__test__/Fixtures/Order"
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
        ...UntouchedOrder,
        id: "1234",
      },
      relay: {
        environment: {},
      } as RelayProp,
      router: { push: jest.fn() },
    } as any
  })

  it("commits the mutation with the orderId", () => {
    const component = getWrapper(props)
    const mockCommitMutation = commitMutation as jest.Mock<any>
    mockCommitMutation.mockImplementationOnce((_environment, config) => {
      expect(config.variables.input.orderId).toBe("1234")
    })

    component.find(Button).simulate("click")

    expect.hasAssertions()
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

    expect.hasAssertions()
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

    expect.hasAssertions()
  })

  describe("mutation", () => {
    it("routes to payment screen after mutation completes", () => {
      const component = getWrapper(props)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted()
        }
      )

      component.find(Button).simulate("click")

      expect(props.router.push).toHaveBeenCalledWith("/order2/1234/payment")
    })

    it("shows the button spinner while loading the mutation", () => {
      const component = getWrapper(props)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(() => {
        const buttonProps = component
          .update() // We need to wait for the component to re-render
          .find(Button)
          .props() as any
        expect(buttonProps.loading).toBeTruthy()
      })

      component.find(Button).simulate("click")

      expect.hasAssertions()
    })
  })
})
