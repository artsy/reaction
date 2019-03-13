import { ContextProvider } from "Artsy"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchResultsArtworksRoute as SearchResultsArtworks } from "../SearchResultsArtworks"

describe("SearchResultsArtworks", () => {
  const getWrapper = (searchProps: any) => {
    return mount(
      <MockBoot>
        <ContextProvider>
          <SearchResultsArtworks {...searchProps} />
        </ContextProvider>
      </MockBoot>
    )
  }

  const props = {
    term: "andy",
    viewer: {
      search: {
        edges: [
          {
            node: {
              title: "Catty Artwork",
              artist_names: "Percy Z",
              date: "2019",
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

  it("renders artworks contents", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Catty Artwork, 2019 by Percy Z")
  })

  it("renders the pagination control", () => {
    const wrapper = getWrapper(props)
    expect(wrapper.find(Pagination).exists).toBeTruthy()
  })
})
