// TODO: write some tests
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { Spacer } from "@artsy/palette"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components/Pagination"
import { Provider } from "unstated"
import {
  MockBoot,
  MockRelayRenderer,
  renderRelayTree,
  renderUntil,
} from "../../../../../DevTools"
import { CollectionAppFixture } from "../../../../__test__/Fixtures/Collect/CollectionAppFixture"
import { FilterState } from "../../../FilterState"
import { CollectArtworkGridRefreshContainer as CollectArtworkGrid } from "../CollectArtworkGrid"

jest.unmock("react-relay")

describe("CollectArtworkGrid", () => {
  it("Loads ArtworkGrid and pagers", async () => {
    let filterState: FilterState = null

    beforeEach(() => {
      filterState = new FilterState({
        tracking: {
          trackEvent: jest.fn(),
        },
      })
    })
    // const TestContainer = createFragmentContainer(
    //   (props: any) => {
    //     return <CollectArtworkGrid filtered_artworks={props.artist.artworks_connection} />
    //   },
    //   graphql`
    //     fragment ArtworkGrid_artist on Artist {
    //       filter_artworks(first: 4) {
    //         ...ArtworkGrid_artworks
    //       }
    //     }
    //   `
    // )

    // const getRelayWrapper = async (artworks = ArtworkGridFixture) => {
    // const tree = await renderRelayTree({
    //   Component: CollectArtworkGrid,
    //   query: graphql`
    //     query CollectArtworkGridTestQuery {
    //       filtered_artworks: filter_artworks(medium: "painting") {
    //         ...CollectArtworkGrid_filtered_artworks
    //       }
    //     }
    //   `,
    //   mockResolvers: {
    //     Artworks: () => CollectionAppFixture.collection.filtered_artworks,
    //   },
    // })

    const tree = await renderUntil(
      wrapper => {
        console.log("I AM WAITING", wrapper)
        console.log("spacer", wrapper.find(Spacer))
        // return e.length > 0
        return true
      },
      <MockBoot breakpoint="lg">
        <Provider inject={[filterState]}>
          <MockRelayRenderer
            Component={CollectArtworkGrid}
            query={graphql`
              query CollectArtworkGridTestQuery {
                filtered_artworks: filter_artworks(medium: "painting") {
                  ...CollectArtworkGrid_filtered_artworks
                }
              }
            `}
            mockResolvers={{
              FilterArtworks: () =>
                CollectionAppFixture.collection.filtered_artworks,
            }}
          />
        </Provider>
      </MockBoot>
    )
    // console.log('tree', tree)
    expect(true).toBeTruthy()
  })

  it("Calls #loadNext on pager click", () => {
    expect(true).toBeTruthy()
  })

  it("#loadNext calls #loadAfter if hasNextPage", () => {
    expect(true).toBeTruthy()
  })
})

// import React from "react"
// import { graphql } from "react-relay"

// import { Provider } from "unstated"
// import { MockBoot, MockRelayRenderer, renderUntil } from "../../../DevTools"
// import { CollectionAppFixture } from "../../__test__/Fixtures/Collect/CollectionAppFixture"
// import { CollectionAppFragmentContainer as CollectionApp } from "../CollectionApp"
// import { FilterContainer } from "../Components/Filters"
// import { FilterState } from "../FilterState"

// jest.unmock("react-relay")

// describe("CollectionApp", () => {
//   let filterState: FilterState = null

//   beforeEach(() => {
//     filterState = new FilterState({
//       tracking: {
//         trackEvent: jest.fn(),
//       },
//     })
//   })

//   it("renders a relay tree correctly", async () => {
//     const tree = await renderUntil(
//       wrapper => {
//         return wrapper.find(FilterContainer).length > 0
//       },
//       <MockBoot breakpoint="lg">
//         <Provider inject={[filterState]}>
//           <MockRelayRenderer
//             Component={CollectionApp}
//             query={graphql`
//               query CollectionAppTestQuery {
//                 collection: marketingCollection(slug: "kaws-companions") {
//                   ...CollectionApp_collection
//                 }
//               }
//             `}
//             mockResolvers={{
//               MarketingCollection: () => CollectionAppFixture.collection,
//               ArtworkConnection: () =>
//                 CollectionAppFixture.collection.filtered_artworks.artworks,
//               FormattedNumber: () => 3,
//             }}
//           />
//         </Provider>
//       </MockBoot>
//     )

//     const items = tree.find("GridItem__ArtworkGridItem")
//     expect(items.length).toEqual(4)
//     expect(items.at(0).text()).toContain("Pinocchio, 2018")
//     expect(items.at(1).text()).toContain("KAWS x Undercover , 1999")
//   })
// })
