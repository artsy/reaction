import { Flex, Sans, Serif } from "@artsy/palette"
import { Collections_categories } from "__generated__/Collections_categories.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { BreadCrumbList } from "Components/v2/Seo"
import { Link, Router } from "found"
import React, { Component } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { CollectionEntity, CollectionsGrid } from "./Components/CollectionsGrid"

interface CollectionsAppProps {
  categories: Collections_categories
  router: Router
}

const META_DESCRIPTION =
  "Discover collections of art curated by Artsy Specialists. From iconic artist series to trending design, shop " +
  "collections on the world's largest online art marketplace."

export class CollectionsApp extends Component<CollectionsAppProps> {
  render() {
    const { categories, router } = this.props

    return (
      <>
        <Title>Collections | Artsy</Title>
        <Meta property="og:url" content={`${sd.APP_URL}/collections`} />
        <Meta name="description" content={META_DESCRIPTION} />
        <Meta property="og:description" content={META_DESCRIPTION} />
        <Meta property="twitter:description" content={META_DESCRIPTION} />
        <BreadCrumbList
          items={[{ path: "/collections", name: "Collections" }]}
        />

        <AppContainer>
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
                <Link to="/collect">View works</Link>
              </Sans>
            </Flex>
            {categories &&
              [...categories] // creates a new array since the sort function modifies the array.
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category, index) => (
                  <CollectionsGrid
                    key={index}
                    name={category.name}
                    collections={category.collections as CollectionEntity[]}
                    router={router}
                  />
                ))}
          </FrameWithRecentlyViewed>
        </AppContainer>
      </>
    )
  }
}

export const CollectionsAppFragmentContainer = createFragmentContainer(
  CollectionsApp,
  {
    categories: graphql`
      fragment Collections_categories on MarketingCollectionCategory
        @relay(plural: true) {
        name
        collections {
          slug
          headerImage
          title
        }
      }
    `,
  }
)
