import { ContextProvider } from "Artsy"
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
      },
    },
  }

  it("renders artworks contents", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Catty Artist")
  })
})
