import { ContextProvider } from "Artsy"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchApp } from "../SearchApp"

jest.mock("found", () => {
  return {
    Link: ({
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
    expect(html).toContain("Artworks 100")
    expect(html).toContain("Artists 320")
    expect(html).toContain("Galleries 100")
  })
})
