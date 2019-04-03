import { ContextProvider } from "Artsy"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchApp } from "../SearchApp"

jest.mock("Components/v2/RouteTabs", () => ({
  RouteTab: ({ children }) => children,
  RouteTabs: ({ children }) => children,
}))

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
        aggregations: [
          {
            slice: "TYPE",
            counts: [
              { name: "PartnerGallery", count: 100 },
              { name: "artist", count: 320 },
            ],
          },
        ],
      },
      filter_artworks: {
        counts: {
          total: 100,
        },
      },
    },
  }

  it("includes the total count", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain('520 Results for "andy"')
  })

  it("includes tabs w/ counts", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toMatch(/Artworks.*100/)
    expect(html).toMatch(/Artists.*320/)
    expect(html).toMatch(/Galleries.*100/)
  })
})
