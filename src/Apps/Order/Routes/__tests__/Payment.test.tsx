import { Checkbox, CheckboxProps, Sans } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"

import {
  OrderWithShippingDetails,
  PickupOrder,
  UntouchedOrder,
} from "Apps/__test__/Fixtures/Order"
import { Collapse } from "../../../../Styleguide/Components"
import { AddressFields } from "../../Components/AddressFields"
import { CreditCardInput } from "../../Components/CreditCardInput"
import {
  creatingCreditCardSuccess,
  settingOrderPaymentSuccess,
} from "../__fixtures__/MutationResults"
import { ContinueButton, PaymentProps, PaymentRoute } from "../Payment"
import {
  fillAddressForm,
  validAddress as validAddressWithPhone,
} from "./support"
jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

jest.mock("react-stripe-elements", () => ({
  CardElement: props => <div {...props} />,
  injectStripe: args => args,
}))

import { commitMutation, RelayProp } from "react-relay"

const mutationMock = commitMutation as jest.Mock<any>
const { phoneNumber, ...validAddress } = validAddressWithPhone
describe("Payment", () => {
  let stripeMock
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
    fillAddressForm(paymentRoute, validAddress)

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

    const paymentRoute = mount(<PaymentRoute {...testProps} />)
    // fillAddressForm(paymentRoute, validAddress)
    paymentRoute.find(ContinueButton).simulate("click")

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

    fillAddressForm(paymentRoute, validAddress)
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

    const paymentRoute = mount(<PaymentRoute {...testProps} />)
    fillAddressForm(paymentRoute, validAddress)
    paymentRoute.find(ContinueButton).simulate("click")

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
    fillAddressForm(paymentRoute, validAddress)

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

    const paymentRoute = mount(<PaymentRoute {...testProps} />)
    fillAddressForm(paymentRoute, validAddress)
    paymentRoute.find(ContinueButton).simulate("click")

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
    const paymentRoute = mount(<PaymentRoute {...testProps} />)
    fillAddressForm(paymentRoute, validAddress)
    paymentRoute.find(ContinueButton).simulate("click")

    expect(testProps.router.push).toHaveBeenCalledWith("/order2/1234/review")
  })

  describe("Validations", () => {
    let shipOrderProps
    beforeEach(() => {
      const shipOrder = {
        ...UntouchedOrder,
        requestedFulfillment: {
          __typename: "Ship",
        },
      }
      shipOrderProps = { ...testProps, order: shipOrder }
    })

    it("does not submit an empty form if shipping/billing address are different", () => {
      const paymentRoute = mount(<PaymentRoute {...testProps} />)
      const { addressLine1, ...badAddress } = validAddress
      ;(paymentRoute.find(Checkbox).props() as CheckboxProps).onSelect(false)

      paymentRoute.find(ContinueButton).simulate("click")
      expect(commitMutation).not.toBeCalled()
    })

    it("does not submit the mutation with an incomplete form with billing address exposed", () => {
      const paymentRoute = mount(<PaymentRoute {...testProps} />)
      const { addressLine1, ...badAddress } = validAddress
      ;(paymentRoute.find(Checkbox).props() as CheckboxProps).onSelect(false)
      fillAddressForm(paymentRoute, badAddress)

      paymentRoute.find(ContinueButton).simulate("click")
      expect(commitMutation).not.toBeCalled()
    })
  })
})
