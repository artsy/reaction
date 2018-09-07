import { Sans, Checkbox } from "@artsy/palette"
import { shallow } from "enzyme"
import React from "react"

import { OrderWithShippingDetails } from "Apps/__test__/Fixtures/Order"
import {
  creatingCreditCardSuccess,
  settingOrderPaymentSuccess,
} from "./Fixtures/MutationResults"
import { AddressForm } from "../../Components/AddressForm"
import { ContinueButton, PaymentProps, PaymentRoute } from "../Payment"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

import { commitMutation, RelayProp } from "react-relay"

const mutationMock = commitMutation as jest.Mock<any>

describe("Payment", () => {
  let stripeMock

  const mountPaymentRoute = props => {
    const paymentRouteComponent = shallow(<PaymentRoute {...props} />)
    const responsiveComponent = shallow(
      paymentRouteComponent
        .childAt(2)
        .props()
        .children({ xs: false })
    ) as any
    const twoColumnLayout = shallow(
      responsiveComponent.props().children({ xs: false })
    )

    return {
      paymentRouteComponent,
      responsiveComponent,
      twoColumnLayout,
    }
  }

  let testProps: PaymentProps

  beforeEach(() => {
    mutationMock.mockReset()

    stripeMock = {
      createToken: jest.fn(),
    }

    testProps = {
      order: { ...OrderWithShippingDetails, id: "1234" },
      relay: { environment: {} } as RelayProp,
      router: { push: jest.fn() },
      stripe: stripeMock,
    } as any
  })

  it("tokenizes credit card information using shipping address as billing address", () => {
    const thenMock = jest.fn()
    stripeMock.createToken.mockReturnValue({ then: thenMock })

    mountPaymentRoute(testProps)
      .twoColumnLayout.find(ContinueButton)
      .simulate("click")

    expect(stripeMock.createToken).toHaveBeenCalledWith({
      name: "Joelle Van Dyne",
      address_line1: "401 Broadway",
      address_line2: "Suite 25",
      address_city: "New York",
      address_state: "NY",
      address_zip: "10013",
      address_country: "US",
    })
    expect(thenMock.mock.calls.length).toBe(1)
  })

  it("tokenizes credit card information with a different billing address", () => {
    const thenMock = jest.fn()
    stripeMock.createToken.mockReturnValue({ then: thenMock })

    const { twoColumnLayout } = mountPaymentRoute(testProps)

    twoColumnLayout.find(Checkbox).simulate("select", false)
    twoColumnLayout.find(AddressForm).simulate("change", {
      name: "Artsy UK Ltd",
      addressLine1: "14 Gower's Walk",
      addressLine2: "Suite 2.5, The Loom",
      city: "Whitechapel",
      region: "London",
      postalCode: "E1 8PY",
      country: "UK",
    })

    twoColumnLayout.find(ContinueButton).simulate("click")

    expect(stripeMock.createToken).toHaveBeenCalledWith({
      name: "Artsy UK Ltd",
      address_line1: "14 Gower's Walk",
      address_line2: "Suite 2.5, The Loom",
      address_city: "Whitechapel",
      address_state: "London",
      address_zip: "E1 8PY",
      address_country: "UK",
    })
    expect(thenMock.mock.calls.length).toBe(1)
  })

  it("commits createCreditCard mutation with stripe token id", () => {
    const stripeToken: stripe.TokenResponse = {
      token: {
        id: "tokenId",
        object: null,
        client_ip: null,
        created: null,
        livemode: null,
        type: null,
        used: null,
      },
    }

    stripeMock.createToken.mockReturnValue({ then: func => func(stripeToken) })

    mountPaymentRoute(testProps)
      .twoColumnLayout.find(ContinueButton)
      .simulate("click")

    expect(mutationMock.mock.calls[0][1]).toMatchObject({
      variables: {
        input: {
          token: "tokenId",
        },
      },
    })
  })

  it("shows an error message when CreateToken passes in an error", () => {
    const stripeError: stripe.TokenResponse = {
      error: {
        type: null,
        charge: null,
        message: "Your card number is invalid.",
        code: null,
        decline_code: null,
        param: null,
      },
    }

    stripeMock.createToken.mockReturnValue({ then: func => func(stripeError) })

    const { paymentRouteComponent, twoColumnLayout } = mountPaymentRoute(
      testProps
    )

    twoColumnLayout.find(ContinueButton).simulate("click")

    paymentRouteComponent.update()
    const responsiveComponent = shallow(
      paymentRouteComponent
        .childAt(2)
        .props()
        .children({ xs: false })
    ) as any
    const updatedTwoColumnLayout = shallow(
      responsiveComponent.props().children({ xs: false })
    )

    expect(updatedTwoColumnLayout.find(Sans).html()).toContain(
      "Your card number is invalid."
    )
  })

  it("commits setOrderPayment mutation with Gravity credit card id", () => {
    stripeMock.createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    mutationMock.mockImplementationOnce((_, { onCompleted }) =>
      onCompleted(creatingCreditCardSuccess)
    )

    mountPaymentRoute(testProps)
      .twoColumnLayout.find(ContinueButton)
      .simulate("click")

    expect(mutationMock.mock.calls[1][1]).toMatchObject({
      variables: {
        input: {
          creditCardId: "gravityCreditCardId",
          orderId: "1234",
        },
      },
    })
  })

  it("takes the user to the review step", () => {
    stripeMock.createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    mutationMock
      .mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(creatingCreditCardSuccess)
      )
      .mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(settingOrderPaymentSuccess)
      )

    mountPaymentRoute(testProps)
      .twoColumnLayout.find(ContinueButton)
      .simulate("click")

    expect(testProps.router.push).toHaveBeenCalledWith("/order2/1234/review")
  })
})
