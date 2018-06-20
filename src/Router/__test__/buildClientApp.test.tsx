import { mount } from "enzyme"
import React from "react"
import { buildClientApp } from "../buildClientApp"

describe("buildClientApp", () => {
  const getWrapper = async (props = {}) => {
    const { ClientApp } = await buildClientApp({
      historyProtocol: "memory",
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Route</div>,
        },
      ],
    })

    return mount(<ClientApp />)
  }

  it("resolves with a <ClientApp /> component", async () => {
    expect((await getWrapper()).html()).toContain("<div>Hello Route</div>")
  })

  it("bootstraps data from __RELAY_BOOTSTRAP__", async () => {
    window.__RELAY_BOOTSTRAP__ = JSON.stringify([
      ["cacheKey", "found window cache"],
    ])

    expect(
      ((await getWrapper())
        .find("AppShell")
        .props() as any).provide.relayEnvironment.relaySSRMiddleware.cache.values()
    ).toContain("found window cache")
  })
})
