// Begun from example in Register_analytics.test.tsx
import { RegisterAppResponseFixture } from "Apps/__tests__/Fixtures/Auction/Routes/Register"
import { mockTracking } from "Artsy/Analytics"
import { createMockNetworkLayer2 } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { HeadProvider } from "react-head"
import { Environment, RecordSource, Store } from "relay-runtime"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { RegisterRouteFragmentContainer } from "../Register"

jest.unmock("react-tracking")

jest.mock("react-stripe-elements", () => ({
  Elements: ({ children }) => children,
  StripeProvider: ({ children }) => children,
  CardElement: () => null,
  injectStripe: x => x,
}))

const { Component: TrackedRegisterRoute, dispatch: mockTrack } = mockTracking(
  RegisterRouteFragmentContainer
)

const network = createMockNetworkLayer2({ mockData: {} })
const source = new RecordSource()
const store = new Store(source)
const environment = new Environment({ network, store })

const relay = { environment }
const defaultProps = { ...RegisterAppResponseFixture, relay }

describe("Auction Registration Analytics ", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  const mountRoute = (propOverrides = {}) => {
    const props = { ...defaultProps, ...propOverrides }
    return mount(
      <HeadProvider>
        <TrackedRegisterRoute {...props as any} />
      </HeadProvider>
    )
  }
  it("tracks form submission failure when form validation fails", async () => {
    const wrapper = mountRoute()

    await wrapper
      .find("form")
      .first()
      .simulate("submit")
    await flushPromiseQueue()

    expect(mockTrack).toHaveBeenCalledWith({
      action_type: "Registration failed to submit",
      context_page: "Auction Registration page",
      auction_slug: "whatever-slug",
      auction_state: "open",
      error_messages: [
        "Name is required",
        "Address is required",
        "Country is required",
        "City is required",
        "State is required",
        "Postal code is required",
        "Telephone is required",
        "You must agree to the Conditions of Sale",
      ],
      sale_id: "abcde",
      user_id: "1",
    })
  })

  it("tracks form submission failure when create bidder mutation fails", () => {
    pending()
  })

  it("tracks form submission failure when create credit card Stripe API call fails", () => {
    pending()
  })

  it("tracks form submission success", async () => {
    pending()
  })
})
