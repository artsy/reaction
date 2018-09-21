import { PreloadLink } from "Artsy"
import { ContextProvider } from "Components/Artsy"
import { mount } from "enzyme"
import React from "react"
import { fetchQuery } from "react-relay"
import "regenerator-runtime/runtime" // FIXME: Open PR react-relay-network-modern to fix this

jest.mock("react-relay", () => ({
  fetchQuery: jest.fn(),
}))

jest.mock("found", () => {
  return {
    ResolverUtils: {
      getRouteMatches: x => [{ hello: "there " }],
      getRouteValues: x => x,
    },
    Link: () => <div />,
    withRouter: Component => Component,
  }
})

const resolveFetch = () => {
  ;(fetchQuery as any).mockImplementation(() => Promise.resolve({}))
}

// FIXME: Reenable
xdescribe("PreloadLink", () => {
  const getWrapper = (props = {}) => {
    return mount(
      <ContextProvider>
        <PreloadLink {...defaultProps as any} {...props as any} />
      </ContextProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("fetches data immediately if `immediate` is true", () => {
    getWrapper()
    expect(fetchQuery).toHaveBeenCalled()
  })

  it("does not fetch data if `immediate` is false", () => {
    getWrapper({ immediate: false })
    expect(fetchQuery).not.toHaveBeenCalled()
  })

  it("sets `isLoading` state to true if fetching data", done => {
    resolveFetch()
    global.console.error = jest.fn()
    const onToggleLoading = jest.fn()
    const wrapper = getWrapper({ onToggleLoading })
    // TODO: Appropriately type
    const instance: any = wrapper.find("PreloadLink").instance()
    expect(instance.state.isLoading).toEqual(true)
    expect(onToggleLoading).toBeCalledWith(true)
    setTimeout(() => {
      expect(onToggleLoading).toBeCalledWith(false)
      // TODO: Appropriately type
      const newInstance: any = wrapper
        .find("PreloadLink")
        .first()
        .instance()
      expect(newInstance.state.isLoading).toEqual(false)
      done()
    })
  })

  it("calls onToggleLoading callback if loading", done => {
    resolveFetch()
    const onToggleLoading = jest.fn()
    getWrapper({ onToggleLoading })
    expect(onToggleLoading).toBeCalledWith(true)
    setTimeout(() => {
      expect(onToggleLoading).toBeCalledWith(false)
      done()
    })
  })

  it("logs with an error if there is an error during fetch", done => {
    ;(fetchQuery as any).mockImplementation(() => Promise.reject("Error!"))
    global.console.error = jest.fn()
    getWrapper()
    setTimeout(() => {
      expect(global.console.error).toHaveBeenCalledWith(
        "[Reaction Router/PreloadLink]",
        "Error!"
      )
      done()
    })
  })

  it("fetches data when clicked", async () => {
    const wrapper = await getWrapper({ immediate: false })
    expect(fetchQuery).not.toHaveBeenCalled()
    const instance = wrapper.find("PreloadLink").instance() as any
    instance.handleClick({ preventDefault: jest.fn() })
    expect(fetchQuery).toHaveBeenCalled()
  })

  it("calls router.push if `to` is passed", async done => {
    resolveFetch()
    const to = "/push-history"
    const wrapper = await getWrapper({ immediate: false, to })
    const instance = wrapper.find("PreloadLink").instance() as any
    const spy = spyOn(instance.props.router, "push")
    instance.handleClick({ preventDefault: jest.fn() })
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(to)
      done()
    })
  })

  it("calls router.replace if `replace` is passed", async done => {
    resolveFetch()
    const replace = "/replace-history"
    const wrapper = await getWrapper({ immediate: false, replace })
    const instance = wrapper.find("PreloadLink").instance() as any
    const spy = spyOn(instance.props.router, "replace")
    instance.handleClick({ preventDefault: jest.fn() })
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(replace)
      done()
    })
  })
})

const defaultProps = {
  immediate: true,
  match: jest.fn(),
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    createHref: jest.fn(),
    createLocation: jest.fn(),
    matcher: {
      getRoutes: jest.fn(),
      match: jest.fn(() => true),
    },
  },
  store: {
    getState: jest.fn(x => ({
      found: {},
    })),
  },
  system: {
    routes: [
      {
        Component: () => <div />,
        path: "/",
      },
    ],
    resolver: {
      getRouteVariables: jest.fn(x => []),
    },
  },
}
