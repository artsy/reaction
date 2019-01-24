import { Box } from "@artsy/palette"
import { CollectionApp_collection } from "__generated__/CollectionApp_collection.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { HttpError } from "found"
import React, { Component } from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import truncate from "trunc-html"
import { CollectionFilterFragmentContainer as CollectionFilterContainer } from "./Components/Collection/CollectionFilterContainer"
import { CollectionHeader } from "./Components/Collection/Header"
import { BreadCrumbList } from "./Components/Seo"
import { SeoProductsForArtworks } from "./Components/Seo/SeoProductsForArtworks"

interface CollectionAppProps {
  collection: CollectionApp_collection
}

@track({
  context_module: Schema.ContextModule.CollectionDescription,
})
export class CollectionApp extends Component<CollectionAppProps> {
  collectionNotFound = collection => {
    if (!collection) {
      throw new HttpError(404)
    }
  }

  componentWillMount() {
    this.collectionNotFound(this.props.collection)
  }

  render() {
    const { collection } = this.props
    const { title, slug, headerImage, description, artworks } = collection
    const collectionHref = `${sd.APP_URL}/collection/${slug}`
    const metadataDescription = description
      ? `Buy, bid, and inquire on ${title} on Artsy. ` +
        truncate(description, 158).text
      : `Buy, bid, and inquire on ${title} on Artsy.`

    return (
      <AppContainer>
        <FrameWithRecentlyViewed>
          <Title>{`${title} | Collect on Artsy`}</Title>
          <Meta name="description" content={metadataDescription} />
          <Meta property="og:url" content={collectionHref} />
          <Meta property="og:image" content={headerImage} />
          <Meta property="og:description" content={metadataDescription} />
          <Meta property="twitter:description" content={metadataDescription} />
          <Link rel="canonical" href={collectionHref} />
          <BreadCrumbList
            items={[
              { path: "/collections", name: "Collections" },
              { path: `/collection/${slug}`, name: title },
            ]}
          />
          <SeoProductsForArtworks artworks={artworks} />

          <CollectionHeader collection={collection} />
          <Box>
            <CollectionFilterContainer collection={collection} />
          </Box>
        </FrameWithRecentlyViewed>
      </AppContainer>
    )
  }
}

export const CollectionAppFragmentContainer = createFragmentContainer(
  CollectionApp,
  graphql`
    fragment CollectionApp_collection on MarketingCollection
      @argumentDefinitions(
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, MAJOR_PERIOD, TOTAL]
        }
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        price_range: { type: "String" }
      ) {
      id
      slug
      title
      description
      headerImage
      category
      credit
      query {
        artist_ids
        artist_id
        gene_id
      }
      artworks(
        aggregations: $aggregations
        include_medium_filter_in_aggregation: true
      ) {
        ...SeoProductsForArtworks_artworks
      }

      ...CollectionFilterContainer_collection
        @arguments(
          medium: $medium
          major_periods: $major_periods
          for_sale: $for_sale
          sort: $sort
          acquireable: $acquireable
          at_auction: $at_auction
          inquireable_only: $inquireable_only
          price_range: $price_range
        )
    }
  `
)
