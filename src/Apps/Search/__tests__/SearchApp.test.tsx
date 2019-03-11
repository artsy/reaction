import { ContextProvider } from "Artsy"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchApp } from "../SearchApp"

jest.mock("Artsy/Router/Components/PreloadLink", () => {
  return {
    PreloadLink: ({
      to,
      children: {
        props: { children },
      },
    }) => {
      return `<a href=${to}>${children}</a>`
    },
  }
})

describe("SearchApp", () => {
  const getWrapper = (searchProps: any) => {
    return mount(
      <MockBoot>
        <ContextProvider>
          <SearchApp {...searchProps} />
        </ContextProvider>
      </MockBoot>
    )
  }

  const props = {
    location: {
      query: { term: "andy" },
    },
    viewer: {
      search: {
        totalCount: 420,
        aggregations: [
          {
            slice: "TYPE",
            counts: [
              { name: "artwork", count: 100 },
              { name: "artist", count: 320 },
            ],
          },
        ],
      },
    },
  }

  it("includes the header", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Search Header")
  })

  it("includes the total count", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain('420 results for "andy"')
  })

  it("includes tabs w/ counts", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Artworks 100")
    expect(html).toContain("Artists 320")
  })
})
