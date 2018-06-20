import { mount } from "enzyme"
import React from "react"
import { AppShell } from "../AppShell"

describe("AppShell", () => {
  const getWrapper = (props = {}) => {
    return mount(<AppShell {...props} />)
  }

  it("sets artsy ContextProvider", () => {
    expect(getWrapper().find("ContextProvider").length).toEqual(1)
  })

  it("does not inject loadable-components script tags if not provide", () => {
    expect(getWrapper().html()).not.toContain("__LOADABLE_STATE__")
  })

  it("injects loadable-components script tags if provided", () => {
    expect(
      getWrapper({
        loadableState: {
          getScriptTag: () => "__LOADABLE_STATE__",
        },
      }).html()
    ).toContain("__LOADABLE_STATE__")
  })

  it("injects default __RELAY_BOOTSTRAP__ {} hydration variable if no data", () => {
    expect(getWrapper().html()).toContain('__RELAY_BOOTSTRAP__ = "{}"')
  })

  it("injects __RELAY_BOOTSTRAP__ hydration variable", () => {
    const data = ["hello"]
    expect(
      getWrapper({
        data,
      }).html()
    ).toContain("hello")
  })

  it("renders children", () => {
    expect(mount(<AppShell>child</AppShell>).html()).toContain("child")
  })
})
