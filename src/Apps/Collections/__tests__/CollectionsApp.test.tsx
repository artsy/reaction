import { CategoriesFixture } from "Apps/__tests__/Fixtures/Collections"
import { CollectionsGrid } from "Apps/Collections/Components/CollectionsGrid"
import { MockBoot, renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { BreadCrumbList } from "../../Collect/Components/Seo"
import { CollectionsAppFragmentContainer as CollectionsApp } from "../CollectionsApp"

jest.unmock("react-relay")

describe("CollectionApp", () => {
  it("renders a relay tree correctly", async () => {
    const getRelayWrapper = async () => {
      return await renderRelayTree({
        Component: CollectionsApp,
        query: graphql`
          query CollectionsAppQuery {
            categories: marketingCategories {
              ...CollectionsApp_categories
            }
          }
        `,
        mockResolvers: {
          Query: () => ({
            marketingCategories: () => CategoriesFixture,
          }),
        },
        wrapper: children => <MockBoot breakpoint="lg">{children}</MockBoot>,
      })
    }
    const tree = await getRelayWrapper()

    expect(tree.find(CollectionsGrid).length).toBe(3)
    expect(tree.find(EntityHeader).length).toBe(10)
    expect(tree.text()).toMatch("Abstract Art")
    expect(tree.text()).toMatch("Keith Haring: Pop")

    const breadCrumbList = tree.find(BreadCrumbList)

    expect(breadCrumbList.props().items).toEqual([
      { path: "/collections", name: "Collections" },
    ])
  })
})
