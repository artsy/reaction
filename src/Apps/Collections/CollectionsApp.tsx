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

const META_DESCRIPTION =
  "Discover collections of art curated by Artsy Specialists. From iconic artist series to trending design, shop " +
  "collections on the world's largest online art marketplace."

export class CollectionsApp extends Component<CollectionsAppProps> {
  render() {
    const { categories } = this.props

    return (
      <>
        <Title>Collections | Artsy</Title>
        <Meta property="og:url" content={`${sd.APP_URL}/collections`} />
        <Meta name="description" content={META_DESCRIPTION} />
        <Meta property="og:description" content={META_DESCRIPTION} />
        <Meta property="twitter:description" content={META_DESCRIPTION} />

        <FrameWithRecentlyViewed>
          <Flex
            mt={3}
            mb={4}
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Serif size="8">
              <h1>Collections</h1>
            </Serif>

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
