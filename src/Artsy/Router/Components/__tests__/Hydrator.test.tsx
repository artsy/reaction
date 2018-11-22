import { Hydrator } from "Artsy/Router/Components/Hydrator"
import { mount } from "enzyme"
import React from "react"

describe("AppShell", () => {
  const getWrapper = (props = {}) => {
    return mount(<Hydrator {...props} />)
  }

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
    expect(mount(<Hydrator>child</Hydrator>).html()).toContain("child")
  })
})
