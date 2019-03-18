import { ContextProvider } from "Artsy"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchResultsArtistsRoute as SearchResultsArtists } from "../SearchResultsArtists"

describe("SearchResultsArtworks", () => {
  const getWrapper = (searchProps: any) => {
    return mount(
      <MockBoot>
        <ContextProvider>
          <SearchResultsArtists {...searchProps} />
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

  it("renders artworks contents", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Catty Artist")
  })

  it("renders the pagination control", () => {
    const wrapper = getWrapper(props)
    expect(wrapper.find(Pagination).exists).toBeTruthy()
  })
})
