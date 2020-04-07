import FarceActionTypes from "farce/lib/ActionTypes"
import { ActionTypes as FoundActionTypes } from "found"
import { trackingMiddleware } from "../trackingMiddleware"

declare const global: any

jest.mock("sharify", () => ({
  data: {
    APP_URL: "http://testing.com",
  },
}))

jest.mock("lodash/debounce", () => x => x)

describe("trackingMiddleware", () => {
  const analytics = window.analytics
  const store = {
    getState: () => ({}),
  }
  const noop = x => x

  beforeEach(() => {
    window.analytics = { page: jest.fn() }
  })

  afterEach(() => {
    window.analytics = analytics
  })

  it("tracks pageview on initial load", () => {
    const tracker = trackingMiddleware()
    tracker(store)(noop)({
      type: FarceActionTypes.INIT,
    })
    tracker(store)(noop)({
      type: FarceActionTypes.CREATE_HREF,
      payload: {
        pathname: "/foo",
      },
    })

    expect(global.analytics.page).toBeCalledWith(
      {
        path: "/foo",
        url: "http://testing.com/foo",
      },
      { integrations: { Marketo: false } }
    )
  })

  it("tracks pageviews", () => {
    trackingMiddleware()(store)(noop)({
      type: FoundActionTypes.RESOLVE_MATCH,
      payload: {
        pathname: "/foo",
      },
    })

    expect(global.analytics.page).toBeCalledWith(
      {
        path: "/foo",
        url: "http://testing.com/foo",
      },
      { integrations: { Marketo: false } }
    )
  })

  it("does not track pageviews for other events", () => {
    trackingMiddleware()(store)(noop)({
      type: FarceActionTypes.PUSH,
      payload: {
        pathname: "/bar",
      },
    })
    expect(global.analytics.page).not.toBeCalled()
  })

  it("excludes paths based on config option", () => {
    trackingMiddleware({
      excludePaths: ["/artwork/"],
    })(store)(noop)({
      type: FoundActionTypes.RESOLVE_MATCH,
      payload: {
        pathname: "/artwork/some-id",
      },
    })
    expect(global.analytics.page).not.toBeCalled()
  })

  // TODO: Remove after EXPERIMENTAL_APP_SHELL AB test ends.
  describe("referrers", () => {
    it("tracks collect, collection and collections", () => {
      const tracker = trackingMiddleware()
      const pathsToTest = ["/collect", "/collection/foo", "/collections"]

      pathsToTest.forEach(pathToTest => {
        tracker({
          getState: () => {
            return {
              found: {
                match: {
                  location: {
                    pathname: "/referrer",
                  },
                },
              },
            }
          },
        })(noop)({
          type: FarceActionTypes.UPDATE_LOCATION,
          payload: {
            pathname: pathToTest,
          },
        })

        tracker(store)(noop)({
          type: FoundActionTypes.RESOLVE_MATCH,
          payload: {
            pathname: pathToTest,
          },
        })

        expect(global.analytics.page).toBeCalledWith(
          {
            path: pathToTest,
            referrer: `http://testing.com/referrer`,
            url: `http://testing.com${pathToTest}`,
          },
          { integrations: { Marketo: false } }
        )
      })
    })
  })
})
