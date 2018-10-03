import { routes } from "Apps/Order/routes"
import { ContextProvider } from "Artsy/Router"
import { mount } from "enzyme"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import getFarceResult from "found/lib/server/getFarceResult"
import React from "react"
import { HeadProvider, Meta } from "react-head"
import { ErrorPage } from "../../../Components/ErrorPage"
import { OrderApp } from "../OrderApp"

import { createMockNetworkLayer } from "Artsy/Relay/createMockNetworkLayer"
import { Environment, RecordSource, Store } from "relay-runtime"

jest.mock("react-stripe-elements", () => ({
  Elements: ({ children }) => children,
  StripeProvider: ({ children }) => children,
  CardElement: () => jest.fn(),
  injectStripe: () => jest.fn(),
}))

describe("OrderApp routing redirects", () => {
  // FIXME: move to DevTools folder
  async function render(url, mockResolvers) {
    const network = createMockNetworkLayer(mockResolvers)
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    return await getFarceResult({
      url,
      routeConfig: routes,
      resolver: new Resolver(environment),
      render: createRender({}),
    })
  }

  it("does not redirect to the status route if the order is pending", async () => {
    const { redirect } = await render("/order2/1234/shipping", {
      Order: () => ({
        id: 1234,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "Pickup",
        },
      }),
    })
    expect(redirect).toBe(undefined)
  })

  it("redirects to the status route if the order is not pending", async () => {
    const { redirect } = await render("/order2/1234/shipping", {
      Order: () => ({
        id: 1234,
        state: "ABANDONED",
        requestedFulfillment: {
          __typename: "Pickup",
        },
      }),
    })
    expect(redirect.url).toBe("/order2/1234/status")
  })

  it("stays on the shipping route if no shipping option is set", async () => {
    const { redirect } = await render("/order2/1234/shipping", {
      Order: () => ({
        id: 1234,
        state: "PENDING",
        requestedFulfillment: null,
      }),
    })
    expect(redirect).toBe(undefined)
  })

  it("redirects to the shipping route from the payment route if no shipping option was set", async () => {
    const { redirect } = await render("/order2/1234/payment", {
      Order: () => ({
        id: 1234,
        state: "PENDING",
        requestedFulfillment: null,
      }),
    })
    expect(redirect.url).toBe("/order2/1234/shipping")
  })

  it("stays on the payment route if there is shipping but no payment info", async () => {
    const { redirect } = await render("/order2/1234/payment", {
      Order: () => ({
        id: 1234,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "Ship",
        },
        creditCard: null,
      }),
    })
    expect(redirect).toBe(undefined)
  })

  it("redirects to the shipping route from the review route if no shipping option was set", async () => {
    const { redirect } = await render("/order2/1234/review", {
      Order: () => ({
        id: 1234,
        state: "PENDING",
        requestedFulfillment: null,
        creditCard: null,
      }),
    })
    expect(redirect.url).toBe("/order2/1234/shipping")
  })

  it("redirects to the payment route from the review route if no credit card is set", async () => {
    const { redirect } = await render("/order2/1234/review", {
      Order: () => ({
        id: 1234,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "Ship",
        },
        creditCard: null,
      }),
    })
    expect(redirect.url).toBe("/order2/1234/payment")
  })

  it("stays on the review route if there are payment and shipping options set", async () => {
    const { redirect } = await render("/order2/1234/review", {
      Order: () => ({
        id: 1234,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "Ship",
        },
        creditCard: {
          id: "12345",
        },
      }),
    })
    expect(redirect).toBe(undefined)
  })
})

describe("OrderApp", () => {
  const getWrapper = ({ props, context }) => {
    return mount(
      <HeadProvider>
        <ContextProvider {...context}>
          <OrderApp {...props} />
        </ContextProvider>
      </HeadProvider>
    )
  }
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
  })

  const getProps = ({ state, location, replace } = {}) => {
    return {
      children: false,
      params: {
        orderID: "123",
      },
      location: { pathname: location || "/order/123/shipping" },
      router: {
        // tslint:disable-next-line:no-empty
        addTransitionHook: () => {},
        replace,
      },
      order: { state: state || "PENDING" },
      routeIndices: [],
      routes: [],
    }
  }

  it("omits meta viewport tag unless Eigen", () => {
    const props = getProps()
    const subject = getWrapper({ props })
    const viewportMetaTags = subject
      .find(Meta)
      .filterWhere(meta => meta.props().name === "viewport")
    expect(viewportMetaTags.length).toBe(0)
  })

  it("includes meta viewport tag if Eigen", () => {
    const props = getProps()
    const subject = getWrapper({ props, context: { isEigen: true } })
    const viewportMetaTags = subject
      .find(Meta)
      .filterWhere(meta => meta.props().name === "viewport")
    expect(viewportMetaTags.length).toBe(1)
  })

  it("shows an error page if the order is missing", () => {
    const props = getProps()
    const subject = getWrapper({
      props: { ...props, order: null },
      context: { isEigen: true },
    })

    const viewportMetaTags = subject.find(ErrorPage)

    expect(subject.find(ErrorPage).text()).toContain(
      "Sorry, the page you were looking for doesn’t exist at this URL."
    )
  })
})
