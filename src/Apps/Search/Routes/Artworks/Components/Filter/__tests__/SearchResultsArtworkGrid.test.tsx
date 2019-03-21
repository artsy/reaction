import { SearchAppFixture } from "Apps/__tests__/Fixtures/Search/SearchAppFixture"
import { ArtworkGridItem } from "Components/Artwork/GridItem"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import { MockBoot, MockRelayRenderer, renderUntil } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { SearchResultsArtworkGridRefreshContainer as SearchResultsArtworkGrid } from "../SearchResultsArtworkGrid"

jest.unmock("react-relay")

describe("SearchResultsArtworkGrid", () => {
  const getWrapper = async () => {
    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(ArtworkGridItem).length > 0
      },
      <MockBoot breakpoint="lg">
        <MockRelayRenderer
          Component={SearchResultsArtworkGrid}
          query={graphql`
            query SearchResultsArtworkGridTestQuery {
              filtered_artworks: filter_artworks(size: 2) {
                ...SearchResultsArtworkGrid_filtered_artworks
              }
            }
          `}
          mockResolvers={{
            ArtworkConnection: () => SearchAppFixture.filter_artworks.artworks,
          }}
        />
      </MockBoot>
    )
    return tree
  }

  it("Loads ArtworkGrid and pagers", async () => {
    const component = await getWrapper()
    expect(component.find(Pagination).exists).toBeTruthy()
    expect(component.find(ArtworkGridItem).length).toBe(1)
  })
})
