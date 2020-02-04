import { trackingMiddleware } from "../trackingMiddleware"

declare const global: any

describe("trackingMiddleware", () => {
  const analytics = global.analytics

  beforeEach(() => {
    window.analytics = { page: jest.fn() }
  })

  afterEach(() => {
    window.analytics = analytics
  })

  it("tracks pageviews", () => {
    trackingMiddleware()(null)(props => {
      // noop
    })({
      type: "@@farce/UPDATE_LOCATION",
      payload: {
        pathname: "foo",
      },
    })

    expect(global.analytics.page).toBeCalledWith(
      { path: "foo" },
      { integrations: { Marketo: false } }
    )
  })

  it("does not track pageviews for other events", () => {
    trackingMiddleware()(null)(props => {
      // noop
    })({
      type: "@@farce/POP_LOCAION",
      payload: {
        pathname: "bar",
      },
    })
    expect(global.analytics.page).not.toBeCalled()
  })
})
