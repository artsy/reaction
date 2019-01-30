import { Box, Flex, Sans, Serif } from "@artsy/palette"
import { CollectApp_viewer } from "__generated__/CollectApp_viewer.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import React, { Component } from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { getMetadataForMedium } from "./CollectMediumMetadata"
import { CollectFilterFragmentContainer as ArtworkGrid } from "./Components/Base/CollectFilterContainer"
import { BreadCrumbList } from "./Components/Seo"
import { SeoProductsForArtworks } from "./Components/Seo/SeoProductsForArtworks"

export interface CollectAppProps {
  viewer?: CollectApp_viewer
  params?: {
    medium: string
  }
}

export class CollectApp extends Component<CollectAppProps> {
  render() {
    const {
      params,
      viewer: { filter_artworks },
    } = this.props
    const medium = params && params.medium
    const { description, breadcrumbTitle, title } = getMetadataForMedium(medium)
    const canonicalHref = medium
      ? `${sd.APP_URL}/collect/${medium}`
      : `${sd.APP_URL}/collect`

    return (
      <AppContainer>
        <FrameWithRecentlyViewed>
          <Title>{title}</Title>
          <Meta property="og:url" content={`${sd.APP_URL}/collect`} />
          <Meta
            property="og:image"
            content={`${sd.APP_URL}/images/og_image.jpg`}
          />
          <Meta name="description" content={description} />
          <Meta property="og:description" content={description} />
          <Meta property="twitter:description" content={description} />
          <Link rel="canonical" href={canonicalHref} />
          <BreadCrumbList
            items={[
              { path: "/collect", name: "Collect" },
              medium && {
                path: `/collect/${medium}`,
                name: breadcrumbTitle,
              },
            ].filter(Boolean)}
          />
          <SeoProductsForArtworks artworks={filter_artworks} />

          <Flex
            mt={3}
            mb={4}
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Serif size="8">
              <h1 className="title" style={h1Style}>
                Collect art and design online
              </h1>
            </Serif>

            <Sans size="3" weight="medium">
              <a href="/collections">View collections</a>
            </Sans>
          </Flex>
          <Box>
            <ArtworkGrid viewer={this.props.viewer} />
          </Box>
        </FrameWithRecentlyViewed>
      </AppContainer>
    )
  }
}

const h1Style = {
  fontStyle: "inherit",
  fontFamily: "inherit",
  fontWeight: 400,
  fontSize: "inherit",
  margin: 0,
}

export const CollectAppFragmentContainer = createFragmentContainer(
  CollectApp,
  graphql`
    fragment CollectApp_viewer on Viewer
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        offerable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, TOTAL]
        }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        price_range: { type: "String" }
        height: { type: "String" }
        width: { type: "String" }
        artist_id: { type: "String" }
        attribution_class: { type: "String" }
        color: { type: "String" }
      ) {
      filter_artworks(aggregations: $aggregations, size: 0) {
        ...SeoProductsForArtworks_artworks
      }

      ...CollectFilterContainer_viewer
        @arguments(
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          sort: $sort
          acquireable: $acquireable
          offerable: $offerable
          at_auction: $at_auction
          inquireable_only: $inquireable_only
          price_range: $price_range
          height: $height
          width: $width
          artist_id: $artist_id
          attribution_class: $attribution_class
          color: $color
        )
    }
  `
)
