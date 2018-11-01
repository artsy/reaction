import { mount } from "enzyme"
import React from "react"
import { RelayProp } from "react-relay"
import { PaymentFormWrapper } from "../PaymentFormWrapper"
import { CreditCard, SavedCreditCards } from "../SavedCreditCards"
import { UserSettingsPayments } from "../UserSettingsPayments"

jest.mock("react-stripe-elements", () => ({
  Elements: ({ children }) => children,
  StripeProvider: () => <div />,
  CardElement: () => jest.fn(),
  injectStripe: () => jest.fn(),
}))

describe("UserSettingsPayments", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
  })

  it("shows only the payment form if there are no saved credit cards", () => {
    const testProps = {
      me: { id: "1234", creditCards: { edges: [] } },
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
      me: {
        id: "1234",
        creditCards: { edges: [{ brand: "Visa" }, { brand: "Visa" }] },
      },
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
