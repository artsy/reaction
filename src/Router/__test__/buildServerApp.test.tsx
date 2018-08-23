/**
 * @jest-environment node
 */

import { render } from "enzyme"
import React from "react"
import { Subscribe } from "unstated"
import { buildServerApp } from "../buildServerApp"
import { AppState } from "../state"

jest.mock("loadable-components/server", () => ({
  getLoadableState: () =>
    Promise.resolve({
      getScriptTag: () => "__LOADABLE_STATE__",
    }),
}))

describe("buildServerApp", () => {
  const getWrapper = async (url = "/") => {
    const { ServerApp, status } = await buildServerApp({
      routes: [
        {
          path: "/",
          Component: () => <div>hi!</div>,
        },
      ],
      url,
    })

    return {
      wrapper: render(<ServerApp />),
      status,
    }
  }

  it("resolved with a <ServerApp /> component", async () => {
    const { wrapper } = await getWrapper()
    expect(wrapper.html()).toContain("<div>hi!</div>")
  })

  it("bootstraps relay and loadable-components SSR data", async () => {
    const { wrapper } = await getWrapper()
    expect(wrapper.html()).toContain("__RELAY_BOOTSTRAP__")
    expect(wrapper.html()).toContain("__LOADABLE_STATE__")
  })

  it("resolves with a 200 status if url matches request", async () => {
    const { status } = await getWrapper("/")
    expect(status).toEqual(200)
  })

  it("resolves with a 404 status if url does not match request", async () => {
    const { status } = await getWrapper("/bad-url")
    expect(status).toEqual(404)
  })

  it("passes items along in context option", async done => {
    const HomeApp = () => {
      return (
        <Subscribe to={[AppState]}>
          {({ state: { system } }) => {
            expect(Object.keys(system)).toEqual([
              "routes",
              "url",
              "context",
              "relayEnvironment",
              "resolver",
              "currentUser",
            ])
            expect(Object.keys(system.context)).toEqual(["mediator", "user"])
            setImmediate(done)
            return <div />
          }}
        </Subscribe>
      )
    }

    const { ServerApp } = await buildServerApp({
      routes: [
        {
          path: "/",
          Component: HomeApp,
        },
      ],
      url: "/",
      context: {
        mediator: jest.fn(),
        user: {
          id: "foo",
          accessToken: "bar",
        },
      },
    })

    render(<ServerApp />)
  })
})
