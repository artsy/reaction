import { ContextProvider } from "Artsy"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchResultMoreRoute as SearchResultsMore } from "../SearchResultsMore"

describe("SearchResultsMore", () => {
  const getWrapper = (searchProps: any) => {
    return mount(
      <MockBoot>
        <ContextProvider>
          <SearchResultsMore {...searchProps} />
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
              id: "percy",
              displayLabel: "Cat",
              href: "/cat/percy",
              searchableType: "Artistic Cats",
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
    expect(html).toContain("Artistic Cats")
  })

  it("renders the pagination control", () => {
    const wrapper = getWrapper(props)
    expect(wrapper.find(Pagination).exists).toBeTruthy()
  })
})
