import { MockRouter } from "DevTools"
import { mount } from "enzyme"
import { Link } from "found"
import React from "react"
import { RouterLink } from "../RouterLink"

describe("RouterLink", () => {
  it("uses the <Link> component if within a router context", async () => {
    const wrapper = await mount(
      <MockRouter
        routes={[
          {
            path: "/",
            Component: () => {
              return <RouterLink to="/foo">Foo</RouterLink>
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

    expect(wrapper.find(Link).length).toEqual(1)
  })

  it("uses falls back to an <a> tag if missing a router context", () => {
    const wrapper = mount(<RouterLink to="/foo">Foo</RouterLink>)
    expect(wrapper.find(Link).length).toEqual(0)
    expect(wrapper.find("a").length).toEqual(1)
  })
})
