import React from "react"
import { buildClientApp } from "../buildClientApp"
import { mount } from "enzyme"

describe("buildClientApp", () => {
  const getWrapper = async (props = {}) => {
    const { ClientApp } = await buildClientApp({
      routes: [
        {
          Component: () => <div />,
        },
      ],
    })

    return mount(<ClientApp />)
  }

  it("resolves with a <ClientApp /> component", async () => {
    expect((await getWrapper()).html()).toContain("<div>")
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
