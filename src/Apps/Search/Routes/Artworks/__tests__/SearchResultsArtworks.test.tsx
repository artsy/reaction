import { ContextProvider } from "Artsy"
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
      },
    },
  }

  it("renders artworks contents", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Catty Artwork, 2019 by Percy Z")
  })
})
