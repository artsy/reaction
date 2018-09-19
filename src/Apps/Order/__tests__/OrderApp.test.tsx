import { mount } from "enzyme"
import React from "react"
import { OrderApp } from "../OrderApp"

jest.mock("react-head", () => ({
  Title: () => false,
}))

jest.mock("react-stripe-elements", () => ({
  Elements: ({ children }) => children,
  StripeProvider: ({ children }) => children,
}))

describe("OrderApp", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
  })

  const getProps = ({ state, location, replace }) => {
    return {
      children: false,
      params: {
        orderID: "123",
      },
      location: { pathname: location },
      router: {
        // tslint:disable-next-line:no-empty
        addTransitionHook: () => {},
        replace,
      },
      order: { state },
      routeIndices: [],
      routes: [],
    }
  }

  it("does not redirect to the Status route when the order is pending", () => {
    const replace = jest.fn()
    const props = getProps({
      state: "pending",
      location: "/order/123/shipping",
      replace,
    })
    // @ts-ignore
    mount(<OrderApp {...props} />)

    expect(replace).not.toHaveBeenCalled()
  })

  it("does redirects to the Status route when the order is not pending", () => {
    const replace = jest.fn()
    const props = getProps({
      state: "submitted",
      location: "/order/123/review",
      replace,
    })
    // @ts-ignore
    mount(<OrderApp {...props} />)

    expect(replace).toHaveBeenCalled()
  })
})
