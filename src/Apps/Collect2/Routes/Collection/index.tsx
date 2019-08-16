import { Box, Separator } from "@artsy/palette"
import { Collection_collection } from "__generated__/Collection_collection.graphql"
import { CollectionFilterFragmentContainer as CollectionFilterContainer } from "Apps/Collect2/Components/Collection/CollectionFilterContainer"
import { CollectionFilterFragmentContainer as CollectionHeader } from "Apps/Collect2/Components/Collection/Header"
import { SeoProductsForArtworks } from "Apps/Collect2/Components/Seo/SeoProductsForArtworks"
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

interface CollectionAppProps extends SystemContextProps {
  collection: Collection_collection
}

@track<CollectionAppProps>(props => ({
  context_module: Schema.ContextModule.CollectionDescription,
  context_page_owner_slug: props.collection.slug,
  context_page_owner_id: props.collection.id,
}))
export class CollectionApp extends Component<CollectionAppProps> {
  collectionNotFound = collection => {
    if (!collection) {
      throw new HttpError(404)
    }
  }

  UNSAFE_componentWillMount() {
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
          <SeoProductsForArtworks artworks={artworks} />

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
            <CollectionFilterContainer collection={collection} />
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
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL]
          }
          medium: { type: "String", defaultValue: "*" }
          major_periods: { type: "[String]" }
          partner_id: { type: "ID" }
          for_sale: { type: "Boolean" }
          at_auction: { type: "Boolean" }
          acquireable: { type: "Boolean" }
          offerable: { type: "Boolean" }
          inquireable_only: { type: "Boolean" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          price_range: { type: "String" }
          height: { type: "String" }
          width: { type: "String" }
          color: { type: "String" }
          page: { type: "Int" }
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
          ...Header_artworks
          ...SeoProductsForArtworks_artworks
        }

        ...CollectionFilterContainer_collection
          @arguments(
            medium: $medium
            major_periods: $major_periods
            for_sale: $for_sale
            sort: $sort
            acquireable: $acquireable
            offerable: $offerable
            at_auction: $at_auction
            inquireable_only: $inquireable_only
            price_range: $price_range
            height: $height
            width: $width
            color: $color
            page: $page
          )
      }
    `,
  }
)
