import React from "react"
import { graphql } from "react-relay"

import { BreadCrumbList } from "Components/v2/Seo"
import { MockBoot, MockRelayRenderer, renderUntil } from "DevTools"
import { Provider } from "unstated"
import { CollectionAppFixture } from "../../__tests__/Fixtures/Collect/CollectionAppFixture"
import { CollectionAppFragmentContainer as CollectionApp } from "../CollectionApp"
import { FilterContainer } from "../Components/Filters"
import { FilterState } from "../FilterState"

jest.unmock("react-relay")

describe("CollectionApp", () => {
  let filterState: FilterState = null

  beforeEach(() => {
    filterState = new FilterState({
      tracking: {
        trackEvent: jest.fn(),
      },
    })
  })

  it("renders a relay tree correctly", async () => {
    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(FilterContainer).length > 0
      },
      <MockBoot breakpoint="lg">
        <Provider inject={[filterState]}>
          <MockRelayRenderer
            Component={CollectionApp}
            query={graphql`
              query CollectionAppTestQuery {
                collection: marketingCollection(slug: "kaws-companions") {
                  ...CollectionApp_collection
                }
              }
            `}
            mockResolvers={{
              MarketingCollection: () => CollectionAppFixture.collection,
              ArtworkConnection: () =>
                CollectionAppFixture.collection.filtered_artworks.artworks,
              FormattedNumber: () => 3,
            }}
          />
        </Provider>
      </MockBoot>
    )

    const title = tree.find("Title")
    expect(title.at(0).text()).toContain("KAWS: Companions - For Sale on Artsy")

    const breadCrumbList = tree.find(BreadCrumbList)
    expect(breadCrumbList.props().items).toEqual([
      { path: "/collections", name: "Collections" },
      { path: `/collection/kaws-companions`, name: "KAWS: Companions" },
    ])

    const items = tree.find("GridItem__ArtworkGridItem")
    expect(items.length).toEqual(4)
    expect(items.at(0).text()).toContain("Pinocchio, 2018")
    expect(items.at(1).text()).toContain("KAWS x Undercover , 1999")
  })
})
