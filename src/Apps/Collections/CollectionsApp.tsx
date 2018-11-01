import { Box, Sans, Serif } from "@artsy/palette"
import { CollectionsApp_collections } from "__generated__/CollectionsApp_collections.graphql"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import React, { Component } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
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
          <HeaderContainer mt={3} mb={4}>
            <Serif size="8">Collections</Serif>

            <Sans size="3" weight="medium">
              <a href="/collect">View works</a>
            </Sans>
          </HeaderContainer>

          <Box>
            <CollectionsGrid collections={collections} />
          </Box>
        </FrameWithRecentlyViewed>
      </>
    )
  }
}

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const CollectionsAppFragmentContainer = createFragmentContainer(
  CollectionsApp,
  graphql`
    fragment CollectionsApp_collections on MarketingCollection
      @relay(plural: true) {
      slug
      title
      headerImage
    }
  `
)
