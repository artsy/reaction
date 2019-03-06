import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchApp } from "../SearchApp"

describe("SearchApp", () => {
  const getWrapper = (searchProps: any) => {
    return mount(
      <MockBoot>
        <SearchApp viewer={searchProps.viewer} />
      </MockBoot>
    )
  }

  const props = {
    viewer: {
      search: {
        totalCount: 420,
      },
    },
  }

  it("includes the header", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Search Header")
  })

  it("includes navigation tabs", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Search Tabs")
  })

  it("includes the total count", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("420 results")
  })
})
