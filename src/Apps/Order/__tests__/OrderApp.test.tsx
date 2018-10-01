import { ContextProvider } from "Artsy/Router"
import { mount } from "enzyme"
import React from "react"
import { HeadProvider } from "react-head"
import { Meta } from "react-head"
import { ErrorPage } from "../../../Components/ErrorPage"
import { OrderApp } from "../OrderApp"

jest.mock("react-stripe-elements", () => ({
  Elements: ({ children }) => children,
  StripeProvider: ({ children }) => children,
}))

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
      ecommerceOrder: { state: state || "PENDING" },
      routeIndices: [],
      routes: [],
    }
  }

  it("does not redirect to the Status route when the order is pending", () => {
    const replace = jest.fn()
    const props = getProps({
      state: "PENDING",
      location: "/order/123/shipping",
      replace,
    })
    // @ts-ignore
    getWrapper({ props })
    expect(replace).not.toBeCalledWith("/order2/123/status")
  })

  it("redirects to the Status route when the order is not pending", () => {
    const replace = jest.fn()
    const props = getProps({
      state: "SUBMITTED",
      location: "/order/123/review",
      replace,
    })
    // @ts-ignore
    getWrapper({ props })
    expect(replace).toBeCalledWith("/order2/123/status")
  })

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
      props: { ...props, ecommerceOrder: null },
      context: { isEigen: true },
    })

    const viewportMetaTags = subject.find(ErrorPage)

    expect(subject.find(ErrorPage).text()).toContain(
      "Sorry, the page you were looking for doesn’t exist at this URL."
    )
  })
})
