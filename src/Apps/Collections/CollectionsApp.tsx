import { Box, Serif } from "@artsy/palette"
import { CollectionsApp_collections } from "__generated__/CollectionsApp_collections.graphql"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import React, { Component } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { CollectionsGrid } from "./Components/CollectionsGrid"

interface CollectionsAppProps {
  collections: CollectionsApp_collections
}

export class CollectionsApp extends Component<CollectionsAppProps> {
  render() {
    const { collections } = this.props

    return (
      <>
        <Title>All Collections on Artsy</Title>
        <Meta property="og:url" content={`${sd.APP_URL}/collections`} />
        {/* TODO: Confirm title/meta details */}

        <FrameWithRecentlyViewed>
          <Box mt={3} mb={4}>
            <Serif size="8">All Collections</Serif>
          </Box>
          <Box>
            <CollectionsGrid collections={collections} />
          </Box>
        </FrameWithRecentlyViewed>
      </>
    )
  }
}

export const CollectionsAppFragmentContainer = createFragmentContainer(
  CollectionsApp,
  graphql`
    fragment CollectionsApp_collections on MarketingCollection
      @relay(plural: true) {
      id
      slug
      title
      headerImage
    }
  `
)
