import ActionTypes from "farce/lib/ActionTypes"
import { trackingMiddleware } from "../trackingMiddleware"

declare const global: any

describe("trackingMiddleware", () => {
  const analytics = window.analytics
  const store = {
    getState: () => ({}),
  }

  beforeEach(() => {
    window.analytics = { page: jest.fn() }
  })

  afterEach(() => {
    window.analytics = analytics
  })

  it("tracks pageviews", () => {
    trackingMiddleware()(store)(props => {
      // noop
    })({
      type: ActionTypes.UPDATE_LOCATION,
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
    trackingMiddleware()(store)(props => {
      // noop
    })({
      type: ActionTypes.PUSH,
      payload: {
        pathname: "bar",
      },
    })
    expect(global.analytics.page).not.toBeCalled()
  })

  it("excludes paths based on config option", () => {
    trackingMiddleware({
      excludePaths: ["bar"],
    })(store)(props => {
      // noop
    })({
      type: ActionTypes.UPDATE_LOCATION,
      payload: {
        pathname: "bar",
      },
    })
    expect(global.analytics.page).not.toBeCalled()
  })
})
