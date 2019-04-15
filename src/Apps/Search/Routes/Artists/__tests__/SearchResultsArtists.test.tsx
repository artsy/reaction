import { ZeroState } from "Apps/Search/Components/ZeroState"
import { SystemContextProvider } from "Artsy"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchResultsArtistsRoute as SearchResultsArtists } from "../SearchResultsArtists"

describe("SearchResultsArtworks", () => {
  const getWrapper = (searchProps: any) => {
    return mount(
      <MockBoot>
        <SystemContextProvider>
          <SearchResultsArtists {...searchProps} />
        </SystemContextProvider>
      </MockBoot>
    )
  }

  const props = {
    location: { query: { term: "andy" } },
    viewer: {
      search: {
        edges: [
          {
            node: {
              name: "Catty Artist",
              imageUrl: "",
              href: "/artist/catty-artist",
              bio: null,
            },
          },
        ],
        pageInfo: {
          hasNextPage: true,
        },
        pageCursors: {
          around: [],
        },
      },
    },
  }

  const emptyResults = {
    location: { query: { term: "andy" } },
    viewer: {
      search: {
        edges: [],
        pageInfo: {
          hasNextPage: true,
        },
        pageCursors: {
          around: [],
        },
      },
    },
  }

  it("renders artworks contents", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Catty Artist")
  })

  it("renders the pagination control", () => {
    const wrapper = getWrapper(props)
    expect(wrapper.find(Pagination).exists).toBeTruthy()
  })

  it("renders zero state when there are no items", () => {
    const wrapper = getWrapper(emptyResults)
    expect(wrapper.find(ZeroState).exists).toBeTruthy()
  })
})
