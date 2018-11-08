import React from "react"
import { graphql } from "react-relay"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components/Pagination"
import { Provider } from "unstated"
import { ArtworkGridItem } from "../../../../../Components/Artwork/GridItem"
import {
  MockBoot,
  MockRelayRenderer,
  renderUntil,
} from "../../../../../DevTools"
import { CollectionAppFixture } from "../../../../__tests__/Fixtures/Collect/CollectionAppFixture"
import { FilterState } from "../../../FilterState"
import { CollectArtworkGridRefreshContainer as CollectArtworkGridRelay } from "../CollectArtworkGrid"

jest.unmock("react-relay")

describe("CollectArtworkGrid", () => {
  let filterState: FilterState = null

  beforeEach(() => {
    filterState = new FilterState({
      tracking: {
        trackEvent: jest.fn(),
      },
    })
  })

  const getWrapper = async () => {
    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(ArtworkGridItem).length > 0
      },
      <MockBoot breakpoint="lg">
        <Provider inject={[filterState]}>
          <MockRelayRenderer
            Component={CollectArtworkGridRelay}
            query={graphql`
              query CollectArtworkGridTestQuery {
                filtered_artworks: filter_artworks(size: 4) {
                  ...CollectArtworkGrid_filtered_artworks
                }
              }
            `}
            mockResolvers={{
              ArtworkConnection: () =>
                CollectionAppFixture.collection.filtered_artworks.artworks,
            }}
          />
        </Provider>
      </MockBoot>
    )
    return tree
  }

  it("Loads ArtworkGrid and pagers", async () => {
    const component = await getWrapper()
    expect(component.find(Pagination).exists).toBeTruthy()
    expect(component.find(ArtworkGridItem).length).toBe(4)
  })
})
