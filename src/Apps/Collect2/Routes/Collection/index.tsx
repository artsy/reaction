import { Box, Separator } from "@artsy/palette"
import { Collection_collection } from "__generated__/Collection_collection.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { SystemContextProps, withSystemContext } from "Artsy/SystemContext"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "Components/CollectionsHubRails"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { RelatedCollectionsRailFragmentContainer as RelatedCollectionsRail } from "Components/RelatedCollectionsRail/RelatedCollectionsRail"
import { BreadCrumbList } from "Components/v2/Seo"
import { HttpError } from "found"
import React, { Component } from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import truncate from "trunc-html"
import { userIsAdmin } from "Utils/user"
import { CollectionArtworkFilterFragmentContainer as CollectionArtworkFilter } from "./CollectionArtworkFilter"
import { CollectionFilterFragmentContainer as CollectionHeader } from "./CollectionHeader"

// import { CollectionFilterFragmentContainer as CollectionFilterContainer } from "./Components/Collection/CollectionFilterContainer"
// import { SeoProductsForArtworks } from "./Components/Seo/SeoProductsForArtworks"

interface CollectionAppProps extends SystemContextProps {
  collection: Collection_collection
}

@track({
  context_module: Schema.ContextModule.CollectionDescription,
})
export class CollectionApp extends Component<CollectionAppProps> {
  collectionNotFound = marketingCollection => {
    if (!marketingCollection) {
      throw new HttpError(404)
    }
  }

  componentWillMount() {
    this.collectionNotFound(this.props.collection)
  }

  render() {
    const { collection, user } = this.props
    const { title, slug, headerImage, description, artworks } = collection
    const showCollectionHubs =
      collection.linkedCollections.length > 0 && userIsAdmin(user)

    const collectionHref = `${sd.APP_URL}/collection/${slug}`
    const metadataDescription = description
      ? `Buy, bid, and inquire on ${title} on Artsy. ` +
        truncate(description, 158).text
      : `Buy, bid, and inquire on ${title} on Artsy.`

    return (
      <AppContainer>
        <FrameWithRecentlyViewed>
          <Title>{`${title} - For Sale on Artsy`}</Title>
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
          {/*
          <SeoProductsForArtworks artworks={artworks} />
          */}

          <CollectionHeader
            collection={collection}
            artworks={artworks as any}
          />
          {showCollectionHubs && (
            <CollectionsHubRails
              linkedCollections={collection.linkedCollections}
            />
          )}

          <Box>
            <CollectionArtworkFilter collection={collection} />
          </Box>

          <Separator mt={6} mb={3} />

          <Box mt="3">
            <RelatedCollectionsRail
              collections={collection.relatedCollections}
              title={collection.title}
            />
          </Box>
        </FrameWithRecentlyViewed>
      </AppContainer>
    )
  }
}

export const CollectionAppFragmentContainer = createFragmentContainer(
  withSystemContext(CollectionApp),
  {
    collection: graphql`
      fragment Collection_collection on MarketingCollection
        @argumentDefinitions(
          acquireable: { type: "Boolean" }
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL]
          }
          at_auction: { type: "Boolean" }
          color: { type: "String" }
          for_sale: { type: "Boolean" }
          height: { type: "String" }
          inquireable_only: { type: "Boolean" }
          major_periods: { type: "[String]" }
          medium: { type: "String", defaultValue: "*" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          partner_id: { type: "ID" }
          price_range: { type: "String" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          width: { type: "String" }
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
        relatedCollections {
          ...RelatedCollectionsRail_collections
        }
        linkedCollections {
          ...CollectionsHubRails_linkedCollections
        }
        artworks(
          aggregations: $aggregations
          include_medium_filter_in_aggregation: true
          sort: "-decayed_merch"
          size: 12
        ) {
          ...CollectionHeader_artworks
          ...SeoProductsForArtworks_artworks
        }

        ...CollectionArtworkFilter_collection
          @arguments(
            acquireable: $acquireable
            at_auction: $at_auction
            color: $color
            for_sale: $for_sale
            height: $height
            inquireable_only: $inquireable_only
            major_periods: $major_periods
            medium: $medium
            offerable: $offerable
            page: $page
            partner_id: $partner_id
            price_range: $price_range
            sort: $sort
            width: $width
          )
      }
    `,
  }
)
