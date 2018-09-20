import { Checkbox, CheckboxProps, Sans } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"

import {
  OrderWithShippingDetails,
  PickupOrder,
} from "Apps/__test__/Fixtures/Order"
import { Collapse } from "../../../../Styleguide/Components"
import { AddressForm } from "../../Components/AddressForm"
import { CreditCardInput } from "../../Components/CreditCardInput"
import {
  creatingCreditCardFailed,
  creatingCreditCardSuccess,
  settingOrderPaymentFailed,
  settingOrderPaymentSuccess,
  settingOrderShipmentFailure,
} from "../__fixtures__/MutationResults"
import { ContinueButton, PaymentProps, PaymentRoute } from "../Payment"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

jest.mock("react-stripe-elements", () => ({
  CardElement: props => <div {...props} />,
  injectStripe: args => args,
}))

import { commitMutation, RelayProp } from "react-relay"
import {
  ErrorModal,
  ModalButton,
} from "../../../../Components/Modal/ErrorModal"

const mutationMock = commitMutation as jest.Mock<any>

describe("Payment", () => {
  let stripeMock
  let testProps: PaymentProps

  beforeEach(() => {
    console.error = jest.fn() // Silences component logging.
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

  it("always shows the billing address form without checkbox when the user selected 'pick' shipping option", () => {
    const paymentRoute = mount(
      <PaymentRoute {...testProps} order={{ ...PickupOrder, id: "1234" }} />
    )

    expect(paymentRoute.find(Checkbox).length).toBe(0)
    expect(paymentRoute.find(Collapse).props().open).toBe(true)
  })

  it("always uses the billing address for stripe tokenization when the user selected 'pick' shipping option", () => {
    const thenMock = jest.fn()
    stripeMock.createToken.mockReturnValue({ then: thenMock })

    const paymentRoute = mount(
      <PaymentRoute {...testProps} order={{ ...PickupOrder, id: "1234" }} />
    )

    paymentRoute
      .find(AddressForm)
      .props()
      .onChange({
        name: "Artsy UK Ltd",
        addressLine1: "14 Gower's Walk",
        addressLine2: "Suite 2.5, The Loom",
        city: "Whitechapel",
        region: "London",
        postalCode: "E1 8PY",
        country: "UK",
      })

    paymentRoute.find(ContinueButton).simulate("click")

    expect(stripeMock.createToken).toHaveBeenCalledWith({
      name: "Artsy UK Ltd",
      address_line1: "14 Gower's Walk",
      address_line2: "Suite 2.5, The Loom",
      address_city: "Whitechapel",
      address_state: "London",
      address_zip: "E1 8PY",
      address_country: "UK",
    })
  })

  it("tokenizes credit card information using shipping address as billing address", () => {
    const thenMock = jest.fn()
    stripeMock.createToken.mockReturnValue({ then: thenMock })

    mount(<PaymentRoute {...testProps} />)
      .find(ContinueButton)
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

    const paymentRoute = mount(<PaymentRoute {...testProps} />)
    ;(paymentRoute.find(Checkbox).props() as CheckboxProps).onSelect(false)

    paymentRoute
      .find(AddressForm)
      .props()
      .onChange({
        name: "Artsy UK Ltd",
        addressLine1: "14 Gower's Walk",
        addressLine2: "Suite 2.5, The Loom",
        city: "Whitechapel",
        region: "London",
        postalCode: "E1 8PY",
        country: "UK",
      })

    paymentRoute.find(ContinueButton).simulate("click")

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

    mount(<PaymentRoute {...testProps} />)
      .find(ContinueButton)
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

    const paymentRoute = mount(<PaymentRoute {...testProps} />)

    paymentRoute.find(ContinueButton).simulate("click")

    expect(
      paymentRoute
        .find(CreditCardInput)
        .find(Sans)
        .html()
    ).toContain("Your card number is invalid.")
  })

  it("commits setOrderPayment mutation with Gravity credit card id", () => {
    stripeMock.createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    mutationMock.mockImplementationOnce((_, { onCompleted }) =>
      onCompleted(creatingCreditCardSuccess)
    )

    mount(<PaymentRoute {...testProps} />)
      .find(ContinueButton)
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

    mount(<PaymentRoute {...testProps} />)
      .find(ContinueButton)
      .simulate("click")

    expect(testProps.router.push).toHaveBeenCalledWith("/order2/1234/review")
  })

  it("shows an error modal when there is an error in CreateCreditCardPayload", () => {
    stripeMock.createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    mutationMock.mockImplementationOnce((_, { onCompleted }) =>
      onCompleted(creatingCreditCardFailed)
    )

    const component = mount(<PaymentRoute {...testProps} />)

    expect(component.find(ErrorModal).props().show).toBe(false)

    component.find(ContinueButton).simulate("click")

    expect(component.find(ErrorModal).props().show).toBe(true)
    expect(component.find(ErrorModal).props().detailText).toBe(
      "No such token: fake-token"
    )

    component.find(ModalButton).simulate("click")

    expect(component.find(ErrorModal).props().show).toBe(false)
  })

  it("shows an error modal when there is an error in SetOrderPaymentPayload", () => {
    stripeMock.createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    const component = mount(<PaymentRoute {...testProps} />)

    mutationMock
      .mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(creatingCreditCardSuccess)
      )
      .mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(settingOrderPaymentFailed)
      )

    component.find(ContinueButton).simulate("click")

    expect(component.find(ErrorModal).props().show).toBe(true)
  })

  it("shows an error modal when there is a network error", () => {
    stripeMock.createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    const component = mount(<PaymentRoute {...testProps} />)

    mutationMock.mockImplementationOnce((_, { onError }) =>
      onError(new TypeError("Network request failed"))
    )

    component.find(ContinueButton).simulate("click")

    expect(component.find(ErrorModal).props().show).toBe(true)
  })
})
