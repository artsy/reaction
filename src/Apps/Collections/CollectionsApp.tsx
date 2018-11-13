import { Flex, Sans, Serif } from "@artsy/palette"
import { CollectionsApp_categories } from "__generated__/CollectionsApp_categories.graphql"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import React, { Component } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { CollectionEntity, CollectionsGrid } from "./Components/CollectionsGrid"

interface CollectionsAppProps {
  categories: CollectionsApp_categories
}

export class CollectionsApp extends Component<CollectionsAppProps> {
  render() {
    const { categories } = this.props

    return (
      <>
        <Title>All Collections on Artsy</Title>
        <Meta property="og:url" content={`${sd.APP_URL}/collections`} />
        {/* TODO: Confirm title/meta details */}

        <FrameWithRecentlyViewed>
          <Flex
            mt={3}
            mb={4}
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Serif size="8">Collections</Serif>

            <Sans size="3" weight="medium">
              <a href="/collect">View works</a>
            </Sans>
          </Flex>
          {categories &&
            categories.map((category, index) => (
              <CollectionsGrid
                key={index}
                name={category.name}
                collections={category.collections as CollectionEntity[]}
              />
            ))}
        </FrameWithRecentlyViewed>
      </>
    )
  }
}

export const CollectionsAppFragmentContainer = createFragmentContainer(
  CollectionsApp,
  graphql`
    fragment CollectionsApp_categories on MarketingCollectionCategory
      @relay(plural: true) {
      name
      collections {
        slug
        headerImage
        title
      }
    }
  `
)
