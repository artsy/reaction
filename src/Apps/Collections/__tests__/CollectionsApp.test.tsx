import React from "react"
import { graphql } from "react-relay"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { MockBoot, renderRelayTree } from "../../../DevTools"
import { CollectionsFixture } from "../../__test__/Fixtures/CollectionsFixture"
import { CollectionsAppFragmentContainer as CollectionsApp } from "../CollectionsApp"

jest.unmock("react-relay")

describe("CollectionApp", () => {
  it("renders a relay tree correctly", async () => {
    const getRelayWrapper = async () => {
      return await renderRelayTree({
        Component: CollectionsApp,
        query: graphql`
          query CollectionsAppQuery {
            collections: marketingCollections {
              ...CollectionsApp_collections
            }
          }
        `,
        mockResolvers: {
          Query: () => ({
            marketingCollections: () => CollectionsFixture,
          }),
        },
        wrapper: children => <MockBoot breakpoint="lg">{children}</MockBoot>,
      })
    }
    const tree = await getRelayWrapper()

    expect(tree.find(EntityHeader).length).toBe(6)
    expect(tree.text()).toMatch("Big Artists, Small Sculptures")
  })
})
