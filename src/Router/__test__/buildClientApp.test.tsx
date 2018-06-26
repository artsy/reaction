import { mount } from "enzyme"
import React from "react"
import { buildClientApp } from "../buildClientApp"

describe("buildClientApp", () => {
  const getWrapper = async (initialRoute = "/") => {
    const { ClientApp } = await buildClientApp({
      historyProtocol: "memory",
      initialRoute: initialRoute || "/",
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    return mount(<ClientApp />)
  }

  it("resolves with a <ClientApp /> component", async () => {
    expect((await getWrapper()).html()).toContain("<div>Hello Router</div>")
  })

  it("accepts an initial route", async () => {
    expect((await getWrapper("/cv")).html()).toContain("<div>CV Page</div>")
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
