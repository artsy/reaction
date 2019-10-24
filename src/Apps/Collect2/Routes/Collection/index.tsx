import { Box, Separator } from "@artsy/palette"
import { Collection_viewer } from "__generated__/Collection_viewer.graphql"
import { SeoProductsForArtworks } from "Apps/Collect2/Components/SeoProductsForArtworks"
import { CollectionFilterFragmentContainer as CollectionHeader } from "Apps/Collect2/Routes/Collection/Components/Header"
import { AppContainer } from "Apps/Components/AppContainer"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { SystemContextProps, withSystemContext } from "Artsy/SystemContext"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { RelatedCollectionsRailFragmentContainer as RelatedCollectionsRail } from "Components/RelatedCollectionsRail/RelatedCollectionsRail"
import { BreadCrumbList } from "Components/v2/Seo"
import { Location } from "found"
import { HttpError } from "found"
import React, { Component } from "react"
import { Link, Meta, Title } from "react-head"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { data as sd } from "sharify"
import truncate from "trunc-html"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "./Components/CollectionsHubRails"

import { BaseArtworkFilter } from "Components/v2/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
} from "Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/v2/ArtworkFilter/Utils/urlBuilder"
import { TrackingProp } from "react-tracking"

interface CollectionAppProps extends SystemContextProps {
  viewer: Collection_viewer
  location: Location
  relay: RelayRefetchProp
  tracking: TrackingProp
}

@track<CollectionAppProps>(props => ({
  context_module: Schema.ContextModule.CollectionDescription,
  context_page_owner_slug: props.viewer && props.viewer.slug,
  context_page_owner_id: props.viewer && props.viewer.id,
}))
export class CollectionApp extends Component<CollectionAppProps> {
  collectionNotFound = collection => {
    if (!collection) {
      throw new HttpError(404)
    }
  }

  UNSAFE_componentWillMount() {
    this.collectionNotFound(this.props.viewer)
  }

  render() {
    const { viewer, location, relay } = this.props
    const { title, slug, headerImage, description, artworks } = viewer
    const collectionHref = `${sd.APP_URL}/collection/${slug}`

    const metadataDescription = description
      ? `Buy, bid, and inquire on ${title} on Artsy. ` +
        truncate(description, 158).text
      : `Buy, bid, and inquire on ${title} on Artsy.`

    const showCollectionHubs = viewer.linkedCollections.length > 0

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
          {artworks && <SeoProductsForArtworks artworks={artworks} />}
          <CollectionHeader
            collection={viewer as any}
            artworks={artworks as any}
          />
          {showCollectionHubs && (
            <CollectionsHubRails linkedCollections={viewer.linkedCollections} />
          )}
          <Box>
            <ArtworkFilterContextProvider
              filters={location.query}
              sortOptions={[
                { value: "-decayed_merch", text: "Default" },
                { value: "sold,-has_price,-prices", text: "Price (desc.)" },
                { value: "sold,-has_price,prices", text: "Price (asc.)" },
                { value: "-partner_updated_at", text: "Recently updated" },
                { value: "-published_at", text: "Recently added" },
                { value: "-year", text: "Artwork year (desc.)" },
                { value: "year", text: "Artwork year (asc.)" },
              ]}
              aggregations={
                viewer.artworks
                  .aggregations as SharedArtworkFilterContextProps["aggregations"]
              }
              onChange={updateUrl}
              onFilterClick={(key, value, filterState) => {
                this.props.tracking.trackEvent({
                  action_type: Schema.ActionType.CommercialFilterParamsChanged,
                  changed: { [key]: value },
                  current: filterState,
                })
              }}
            >
              <BaseArtworkFilter
                relay={relay}
                viewer={viewer}
                relayVariables={{
                  slug: viewer.slug,
                }}
              />
            </ArtworkFilterContextProvider>
          </Box>
          {viewer.linkedCollections.length === 0 && (
            <>
              <Separator mt={6} mb={3} />
              <Box mt="3">
                <RelatedCollectionsRail
                  collections={viewer.relatedCollections}
                  title={viewer.title}
                />
              </Box>
            </>
          )}
        </FrameWithRecentlyViewed>
      </AppContainer>
    )
  }
}

// TODO: Add `@principalField` to below query
// when KAWS returns a 404 in `errors` for non-existent collections.
// Currently it doesn't send any errors so there isn't anything
// for Metaphysics to propagate.
export const CollectionAppQuery = graphql`
  query CollectionRefetch2Query(
    $acquireable: Boolean
    $aggregations: [ArtworkAggregation] = [
      MERCHANDISABLE_ARTISTS
      MEDIUM
      MAJOR_PERIOD
      TOTAL
    ]
    $at_auction: Boolean
    $color: String
    $for_sale: Boolean
    $height: String
    $inquireable_only: Boolean
    $major_periods: [String]
    $medium: String
    $offerable: Boolean
    $page: Int
    $price_range: String
    $sort: String
    $slug: String!
    $width: String
  ) {
    viewer: marketingCollection(slug: $slug) {
      ...Collection_viewer
        @arguments(
          acquireable: $acquireable
          aggregations: $aggregations
          at_auction: $at_auction
          color: $color
          for_sale: $for_sale
          height: $height
          inquireable_only: $inquireable_only
          major_periods: $major_periods
          medium: $medium
          offerable: $offerable
          page: $page
          price_range: $price_range
          sort: $sort
          width: $width
        )
    }
  }
`

export const CollectionRefetchContainer = createRefetchContainer(
  withSystemContext(CollectionApp),
  {
    viewer: graphql`
      fragment Collection_viewer on MarketingCollection
        @argumentDefinitions(
          acquireable: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]" }
          at_auction: { type: "Boolean" }
          color: { type: "String" }
          for_sale: { type: "Boolean" }
          height: { type: "String" }
          inquireable_only: { type: "Boolean" }
          major_periods: { type: "[String]" }
          medium: { type: "String", defaultValue: "*" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          price_range: { type: "String" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          width: { type: "String" }
        ) {
        category
        credit
        description
        headerImage
        id
        slug
        title
        featuredArtistExclusionIds

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
          size: 20
          sort: "-decayed_merch"
        ) {
          ...Header_artworks
          ...SeoProductsForArtworks_artworks

          aggregations {
            slice
            counts {
              id
              name
              count
            }
          }
        }

        filtered_artworks: artworks(
          acquireable: $acquireable
          aggregations: $aggregations
          at_auction: $at_auction
          color: $color
          for_sale: $for_sale
          height: $height
          inquireable_only: $inquireable_only
          major_periods: $major_periods
          medium: $medium
          offerable: $offerable
          page: $page
          price_range: $price_range
          size: 0
          sort: $sort
          width: $width
        ) {
          __id
          ...ArtworkFilterArtworkGrid2_filtered_artworks
        }
      }
    `,
  },
  CollectionAppQuery
)
