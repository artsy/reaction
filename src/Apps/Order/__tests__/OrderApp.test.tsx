import { routes } from "Apps/Order/routes"
import { ContextProvider } from "Artsy/Router"
import { ErrorPage } from "Components/ErrorPage"
import { mount } from "enzyme"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import getFarceResult from "found/lib/server/getFarceResult"
import React from "react"
import { HeadProvider, Meta } from "react-head"
import { OrderApp } from "../OrderApp"

import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  mockResolver,
  OfferOrderWithShippingDetails,
  OfferWithTotals,
  UntouchedBuyOrder,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { createMockNetworkLayer } from "DevTools/createMockNetworkLayer"
import moment from "moment"
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
    const { redirect } = await render(
      "/orders/1234/shipping",
      mockResolver({
        ...BuyOrderPickup,
        id: 1234,
        state: "PENDING",
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects to the status route if the order is not pending", async () => {
    const { redirect } = await render(
      "/orders/1234/shipping",
      mockResolver({
        ...BuyOrderPickup,
        id: 1234,
        state: "SUBMITTED",
      })
    )
    expect(redirect.url).toBe("/orders/1234/status")
  })

  it("redirects to the artwork page if the order is abandoned", async () => {
    const { redirect } = await render(
      "/orders/1234/shipping",
      mockResolver({
        ...BuyOrderPickup,
        id: 1234,
        state: "ABANDONED",
        lineItems: {
          edges: [
            {
              node: {
                artwork: {
                  id: "artwork-id",
                },
              },
            },
          ],
        },
      })
    )
    expect(redirect.url).toBe("/artwork/artwork-id")
  })

  it("redirects to the home page if the order is abandoned and has no ID", async () => {
    const { redirect } = await render(
      "/orders/1234/shipping",
      mockResolver({
        ...BuyOrderPickup,
        id: 1234,
        state: "ABANDONED",
        lineItems: null,
      })
    )
    expect(redirect.url).toBe("/")
  })

  it("stays on the shipping route if no shipping option is set", async () => {
    const { redirect } = await render(
      "/orders/1234/shipping",
      mockResolver({
        ...UntouchedBuyOrder,
        id: 1234,
        state: "PENDING",
        requestedFulfillment: null,
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects to the shipping route from the payment route if no shipping option was set", async () => {
    const { redirect } = await render(
      "/orders/1234/payment",
      mockResolver({
        ...UntouchedBuyOrder,
        id: 1234,
        state: "PENDING",
        requestedFulfillment: null,
      })
    )
    expect(redirect.url).toBe("/orders/1234/shipping")
  })

  it("stays on the payment route if there is shipping but no payment info", async () => {
    const { redirect } = await render(
      "/orders/1234/payment",
      mockResolver({
        ...UntouchedBuyOrder,
        id: 1234,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "Ship",
        },
        creditCard: null,
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects to the shipping route from the review route if no shipping option was set", async () => {
    const { redirect } = await render(
      "/orders/1234/review",
      mockResolver({
        ...UntouchedBuyOrder,
        id: 1234,
        state: "PENDING",
        requestedFulfillment: null,
        creditCard: null,
      })
    )
    expect(redirect.url).toBe("/orders/1234/shipping")
  })

  it("redirects to the payment route from the review route if no credit card is set", async () => {
    const { redirect } = await render(
      "/orders/1234/review",
      mockResolver({
        ...UntouchedBuyOrder,
        id: 1234,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "Ship",
        },
        creditCard: null,
      })
    )
    expect(redirect.url).toBe("/orders/1234/payment")
  })

  it("stays on the review route if there are payment and shipping options set", async () => {
    const { redirect } = await render(
      "/orders/1234/review",
      mockResolver({
        ...UntouchedBuyOrder,
        id: 1234,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "Ship",
        },
        creditCard: {
          id: "12345",
        },
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects from the status route to the review route if the order is pending", async () => {
    const { redirect } = await render(
      "/orders/1234/status",
      mockResolver({
        ...UntouchedBuyOrder,
        id: 1234,
        state: "PENDING",
        requestedFulfillment: {
          __typename: "Ship",
        },
        creditCard: {
          id: "12345",
        },
      })
    )
    expect(redirect.url).toBe("/orders/1234/review")
  })

  it("stays on the status page if the order is submitted", async () => {
    const { redirect } = await render(
      "/orders/1234/status",
      mockResolver({
        ...UntouchedBuyOrder,
        id: 1234,
        state: "SUBMITTED",
        requestedFulfillment: {
          __typename: "Ship",
        },
        creditCard: {
          id: "12345",
        },
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("stays on the offer route if the order is an offer order", async () => {
    const { redirect } = await render(
      "/orders/1234/offer",
      mockResolver({
        ...UntouchedOfferOrder,
        id: 1234,
        requestedFulfillment: null,
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects from the offer route to the shipping route if the order is not an offer order", async () => {
    const { redirect } = await render(
      "/orders/1234/offer",
      mockResolver({
        ...UntouchedBuyOrder,
        id: 1234,
        requestedFulfillment: null,
      })
    )
    expect(redirect.url).toBe("/orders/1234/shipping")
  })

  it("redirects from the offer route to the status route if the order is not pending", async () => {
    const { redirect } = await render(
      "/orders/1234/offer",
      mockResolver({
        ...BuyOrderWithShippingDetails,
        id: 1234,
        state: "SUBMITTED",
      })
    )
    expect(redirect.url).toBe("/orders/1234/status")
  })

  it("redirects from the respond route to the status route if not offer order", async () => {
    const { redirect } = await render(
      "/orders/1234/respond",
      mockResolver({
        ...BuyOrderWithShippingDetails,
        id: 1234,
        state: "SUBMITTED",
      })
    )
    expect(redirect.url).toBe("/orders/1234/status")
  })

  it("redirects from the respond route to the status route if order is not submitted", async () => {
    const { redirect } = await render(
      "/orders/1234/respond",
      mockResolver({
        ...OfferOrderWithShippingDetails,
        id: 1234,
        state: "PENDING",
        awaitingResponseFrom: "BUYER",
      })
    )
    expect(redirect.url).toBe("/orders/1234/status")
  })

  it("Stays on the respond page if all the appropriate conditions are met", async () => {
    const { redirect } = await render(
      "/orders/1234/respond",
      mockResolver({
        ...OfferOrderWithShippingDetails,
        id: 1234,
        state: "SUBMITTED",
        awaitingResponseFrom: "BUYER",
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("Redirects from the status route to the respond route if awaiting buyer response", async () => {
    const { redirect } = await render(
      "/orders/1234/status",
      mockResolver({
        ...OfferOrderWithShippingDetails,
        id: 1234,
        state: "SUBMITTED",
        awaitingResponseFrom: "BUYER",
      })
    )
    expect(redirect.url).toBe("/orders/1234/respond")
  })

  describe("visiting the /review/counter page", () => {
    const counterOfferOrder = {
      ...OfferOrderWithShippingDetails,
      id: 1234,
      state: "SUBMITTED",
      lastOffer: {
        ...OfferWithTotals,
        id: "last-offer",
        createdAt: moment()
          .subtract(1, "days")
          .toISOString(),
      },
      myLastOffer: {
        id: "my-last-offer",
        createdAt: moment().toISOString(),
      },
      awaitingResponseFrom: "BUYER",
    }
    it("stays on the /review/counter page if all conditions are met", async () => {
      const { redirect } = await render(
        "/orders/1234/review/counter",
        mockResolver(counterOfferOrder)
      )
      expect(redirect).toBe(undefined)
    })
    // goToStatusIfNotOfferOrder,
    it("redirects to /status if not an offer order", async () => {
      const { redirect } = await render(
        "/orders/1234/review/counter",
        mockResolver({
          ...counterOfferOrder,
          mode: "BUY",
        })
      )
      expect(redirect.url).toBe("/orders/1234/status")
    })
    // goToStatusIfNotAwaitingBuyerResponse,
    it("redirects to /status if not awaiting a buyer response", async () => {
      const { redirect } = await render(
        "/orders/1234/review/counter",
        mockResolver({
          ...counterOfferOrder,
          awaitingResponseFrom: "SELLER",
        })
      )
      expect(redirect.url).toBe("/orders/1234/status")
    })
    // goToStatusIfOrderIsNotSubmitted,
    it("redirects to /status if order is not submitted", async () => {
      const { redirect } = await render(
        "/orders/1234/review/counter",
        mockResolver({
          ...counterOfferOrder,
          state: "PENDING",
        })
      )
      expect(redirect.url).toBe("/orders/1234/status")
    })
    // goToRespondIfMyLastOfferIsNotMostRecentOffer,
    it("redirects to /respond if myLastOffer is not more recent than lastOffer", async () => {
      const { redirect } = await render(
        "/orders/1234/review/counter",
        mockResolver({
          ...counterOfferOrder,
          myLastOffer: {
            ...counterOfferOrder.myLastOffer,
            createdAt: moment()
              .subtract(2, "days")
              .toISOString(),
          },
        })
      )
      expect(redirect.url).toBe("/orders/1234/respond")
    })
  })
})

describe("OrderApp", () => {
  const getWrapper = ({ props, context }: any) => {
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

  const getProps = ({ state, location, replace }: any = {}) => {
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
      order: {
        state: state || "PENDING",
      },
      routeIndices: [],
      routes: [],
    }
  }

  it("omits meta viewport tag unless Eigen", () => {
    const props = getProps() as any
    const subject = getWrapper({ props }) as any
    const viewportMetaTags = subject
      .find(Meta)
      .filterWhere(meta => meta.props().name === "viewport")
    expect(viewportMetaTags.length).toBe(0)
  })

  it("includes meta viewport tag if Eigen", () => {
    const props = getProps()
    const subject = getWrapper({ props, context: { isEigen: true } }) as any
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

    subject.find(ErrorPage)

    expect(subject.find(ErrorPage).text()).toContain(
      "Sorry, the page you were looking for doesn’t exist at this URL."
    )
  })
})
