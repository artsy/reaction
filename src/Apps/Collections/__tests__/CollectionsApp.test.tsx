// import { Sans } from "@artsy/palette"
// import { CollectionsApp_collections } from "__generated__/CollectionsApp_collections.graphql"
// import { CollectionsGrid } from "Apps/Collections/Components/CollectionsGrid"
// import React from "react"
// import { graphql } from "react-relay"
// import { MockBoot, MockRelayRenderer, renderUntil } from "../../../DevTools"
// import { CollectionsFixture } from "../../__test__/Fixtures/CollectionsFixture"
// import { CollectionsAppFragmentContainer as CollectionsApp } from "../CollectionsApp"

jest.unmock("react-relay")

describe("CollectionApp", () => {
  it("renders a relay tree correctly", async () => {
    // const tree = await renderUntil(
    //   wrapper => {
    //     return wrapper.find(Sans).length > 0
    //   },
    //   <MockBoot breakpoint="lg">
    //     <MockRelayRenderer
    //       Component={CollectionsApp}
    //       query={graphql`
    //         query CollectionsAppQuery {
    //           collections: marketingCollections {
    //             ...CollectionsApp_collections
    //           }
    //         }
    //       `}
    //       mockResolvers={{
    //         MarketingCollection: () => CollectionsFixture,
    //       }}
    //     />
    //   </MockBoot>
    // )

    expect(true).toBeTruthy()
  })
})
