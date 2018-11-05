import { UserSettingsPayments_me } from "__generated__/UserSettingsPayments_me.graphql"
import { PaymentFormWrapper } from "Components/Payment/PaymentFormWrapper"
import {
  CreditCard,
  SavedCreditCards,
} from "Components/Payment/SavedCreditCards"
import {
  CreditCardType,
  UserSettingsPayments,
} from "Components/Payment/UserSettingsPayments"
import { mount } from "enzyme"
import React from "react"
import { RelayProp } from "react-relay"

jest.mock("react-stripe-elements", () => ({
  Elements: ({ children }) => children,
  StripeProvider: () => <div />,
  CardElement: () => jest.fn(),
  injectStripe: () => jest.fn(),
}))

const mockMe: UserSettingsPayments_me = {
  " $refType": null,
  id: "1234",
  __id: "abcd1234",
  creditCards: { edges: [] },
}

const mockCard: CreditCardType = {
  __id: "abc123",
  id: "123",
  last_digits: "3456",
  expiration_month: 2,
  expiration_year: 2040,
  brand: "Visa",
  __typename: "CreditCard",
}

const mockMeWithCards: UserSettingsPayments_me = {
  " $refType": null,
  id: "1234",
  __id: "abcd1234",
  creditCards: {
    edges: [{ node: { ...mockCard } }, { node: { ...mockCard } }],
  },
}

describe("UserSettingsPayments", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
  })

  it("shows only the payment form if there are no saved credit cards", () => {
    const testProps = {
      me: mockMe,
      relay: { environment: {} } as RelayProp,
      stripe: jest.fn(),
    }
    const paymentWrapper = mount(<UserSettingsPayments {...testProps} />)
    expect(paymentWrapper.find(SavedCreditCards).length).toBe(0)
    expect(paymentWrapper.find(PaymentFormWrapper).length).toBe(1)
    expect(paymentWrapper.text()).not.toContain("Add new card")
  })

  it("shows saved credit cards + form if there are any", () => {
    const testProps = {
      me: mockMeWithCards,
      relay: { environment: {} } as RelayProp,
      stripe: jest.fn(),
    }
    const paymentWrapper = mount(<UserSettingsPayments {...testProps} />)
    expect(paymentWrapper.find(SavedCreditCards).length).toBe(1)
    expect(paymentWrapper.find(CreditCard).length).toBe(2)
    expect(paymentWrapper.find(PaymentFormWrapper).length).toBe(1)
    expect(paymentWrapper.text()).toContain("Add new card")
  })
})
