import { MockRouter } from "DevTools"
import { mount } from "enzyme"
import { Link } from "found"
import React from "react"
import { RouterLink } from "../RouterLink"

jest.mock("Artsy/Analytics/trackPageView", () => ({
  trackPageView: jest.fn(),
}))
const mockTrackPageView = require("Artsy/Analytics/trackPageView")
  .trackPageView as jest.Mock

describe("RouterLink", () => {
  const getWrapper = async (props: any = {}) => {
    return await mount(
      <MockRouter
        initialRoute={props.initialRoute}
        routes={[
          {
            path: "/*",
            Component: () => {
              return (
                <RouterLink to="/foo" {...props}>
                  Foo
                </RouterLink>
              )
            },
          },
        ]}
      />
    ).renderUntil(enzyme => {
      try {
        return enzyme.find(Link).length > 0
      } catch {
        // Guard against enzyme == null, which is the first render pass
      }
    })
  }

  beforeEach(() => {
    mockTrackPageView.mockClear()
  })

  it("uses the <Link> component if within a router context", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(Link).length).toEqual(1)
  })

  it("uses falls back to an <a> tag if missing a router context", () => {
    const wrapper = mount(<RouterLink to="/foo">Foo</RouterLink>)
    expect(wrapper.find(Link).length).toEqual(0)
    expect(wrapper.find("a").length).toEqual(1)
  })

  it("prunes invalid props from being passed to dom", async () => {
    const wrapper = await getWrapper({ hey: true, you: true })
    expect(Object.keys(wrapper.find("a").props())).not.toContain(["hey", "you"])
  })

  it("tracks a pageview and calls onclick when navigating to the same page type", async () => {
    const onClick = jest.fn()
    const wrapper = await getWrapper({
      onClick,
      initialRoute: "/foo/23",
      to: "/foo/45",
    })
    wrapper.find("a").simulate("click")
    expect(mockTrackPageView).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("doesnt track a pageview and calls onclick when navigating to a different page type", async () => {
    const onClick = jest.fn()
    const wrapper = await getWrapper({ onClick })
    wrapper.find("a").simulate("click")
    expect(mockTrackPageView).not.toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
