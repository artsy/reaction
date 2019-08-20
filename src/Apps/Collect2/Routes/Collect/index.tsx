import { Box, Separator, Serif } from "@artsy/palette"
// import { CollectFilterFragmentContainer as ArtworkGrid } from "Apps/Collect2/Components/Base/CollectFilterContainer"
// import { SeoProductsForArtworks } from "Apps/Collect2/Components/Seo/SeoProductsForArtworks"
import { AppContainer } from "Apps/Components/AppContainer"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { BreadCrumbList } from "Components/v2/Seo"
import { Location, Router } from "found"
import React from "react"
import { Link, Meta, Title } from "react-head"
import { data as sd } from "sharify"
import { getMetadataForMedium } from "./CollectMediumMetadata"

// import { ArtworkFilter_viewer } from "__generated__/ArtworkFilter_viewer.graphql"
import { buildUrlForCollectApp } from "Apps/Collect2/Utils/urlBuilder"
import { ArtworkFilter } from "Components/v2/ArtworkFilter"
import { CollectionsHubsNavFragmentContainer as CollectionsHubsNav } from "Components/v2/CollectionsHubsNav"
import { createFragmentContainer, graphql } from "react-relay"

export interface CollectAppProps {
  viewer: any // FIXME: Wire up ArtworkFilter_viewer
  router: Router
  location: Location
  params?: {
    medium: string
  }
}

export const CollectApp: React.FC<CollectAppProps> = track({
  context_page: Schema.PageName.CollectPage,
})(props => {
  const { params, viewer, location, router } = props
  const medium = params && params.medium

  const { description, breadcrumbTitle, title } = getMetadataForMedium(medium)

  const canonicalHref = medium
    ? `${sd.APP_URL}/collect/${medium}`
    : `${sd.APP_URL}/collect`

  // Client renders will get COLLECTION_HUBS from sd; server renders
  // will get it from the SystemContext.
  const showCollectionHubs =
    sd.COLLECTION_HUBS === "experiment" ||
    props.COLLECTION_HUBS === "experiment"

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

        {/* FIXME: Add SEO
              <SeoProductsForArtworks artworks={filter_artworks} />
              fragment on Viewer {
                filter_artworks(aggregations: $aggregations, sort: $sort) {
                  ...SeoProductsForArtworks_artworks
                }
              }
            */}

        <Box mt={3}>
          <Serif size="8">
            <h1>Collect art and design online</h1>
          </Serif>

          {showCollectionHubs && (
            <>
              <Separator mt={2} mb={[2, 2, 2, 4]} />
              <CollectionsHubsNav
                marketingCollections={props.marketingCollections}
              />

              <Separator mb={2} mt={[2, 2, 2, 4]} />
            </>
          )}
        </Box>

        <Box>
          <ArtworkFilter
            viewer={viewer}
            filters={location.query}
            updateURLOnChange={filters => {
              const url = buildUrlForCollectApp(filters)
              router.push(url, "hi")
            }}
          />
        </Box>
      </FrameWithRecentlyViewed>
    </AppContainer>
  )
})

export const CollectAppFragmentContainer = createFragmentContainer(CollectApp, {
  marketingCollections: graphql`
    fragment Collect_marketingCollections on MarketingCollection
      @relay(plural: true) {
      ...CollectionsHubsNav_marketingCollections
    }
  `,
})
