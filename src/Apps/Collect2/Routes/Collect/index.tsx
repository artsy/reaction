import { Box, Separator, Serif, Spacer } from "@artsy/palette"
import { Location, Router } from "found"
import React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"

import { SeoProductsForArtworks } from "Apps/Collect2/Components/SeoProductsForArtworks"
import { buildUrlForCollectApp } from "Apps/Collect2/Utils/urlBuilder"
import { AppContainer } from "Apps/Components/AppContainer"

import { track, useTracking } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { BreadCrumbList } from "Components/v2/Seo"

import { getMetadataForMedium } from "./Components/CollectMediumMetadata"

import { Collect_marketingHubCollections } from "__generated__/Collect_marketingHubCollections.graphql"
import { collectRoutes_ArtworkFilterQueryResponse } from "__generated__/collectRoutes_ArtworkFilterQuery.graphql"
import { ArtworkFilter } from "Components/v2/ArtworkFilter"
import { CollectionsHubsNavFragmentContainer as CollectionsHubsNav } from "Components/v2/CollectionsHubsNav"

export interface CollectAppProps {
  location: Location
  router: Router
  marketingHubCollections: Collect_marketingHubCollections
  viewer: collectRoutes_ArtworkFilterQueryResponse["viewer"]
  filterArtworks: collectRoutes_ArtworkFilterQueryResponse["filterArtworks"]
  params?: {
    medium: string
  }
}

export const CollectApp = track({
  context_page: Schema.PageName.CollectPage,
})((props: CollectAppProps) => {
  const { params, viewer, location } = props
  const medium = params && params.medium
  const { description, breadcrumbTitle, title } = getMetadataForMedium(medium)
  const { trackEvent } = useTracking()

  const canonicalHref = medium
    ? `${sd.APP_URL}/collect/${medium}`
    : `${sd.APP_URL}/collect`

  const { filterArtworks } = props

  const items = [{ path: "/collect", name: "Collect" }]
  if (medium) {
    items.push({
      path: `/collect/${medium}`,
      name: breadcrumbTitle,
    })
  }

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

        <BreadCrumbList items={items} />

        {filterArtworks && <SeoProductsForArtworks artworks={filterArtworks} />}

        <Box mt={3}>
          <Serif size="8">
            <h1>Collect art and design online</h1>
          </Serif>
          <Separator mt={2} mb={[2, 2, 2, 4]} />

          <CollectionsHubsNav
            marketingHubCollections={props.marketingHubCollections}
          />

          <Spacer mb={2} mt={[2, 2, 2, 4]} />
        </Box>

        <Box>
          <ArtworkFilter
            viewer={viewer}
            filters={location.query as any}
            sortOptions={[
              { value: "-decayed_merch", text: "Default" },
              { value: "-partner_updated_at", text: "Recently updated" },
              { value: "-published_at", text: "Recently added" },
              { value: "-year", text: "Artwork year (desc.)" },
              { value: "year", text: "Artwork year (asc.)" },
            ]}
            onChange={filters => {
              const url = buildUrlForCollectApp(filters)

              if (typeof window !== "undefined") {
                window.history.replaceState({}, "", url)
              }

              /**
               * FIXME: Ideally we route using our router, but are running into
               * synchronization issues between router state and URL bar state.
               *
               * See below example as an illustration:
               *
                const newLocation = router.createLocation(url)

                router.replace({
                  ...newLocation,
                  state: {
                    scrollTo: "#jump--artworkFilter"
                  },
                })
               *
               */
            }}
            onFilterClick={(key, value, filterState) => {
              trackEvent({
                action_type: Schema.ActionType.CommercialFilterParamsChanged,
                changed: { [key]: value },
                current: filterState,
              })
            }}
          />
        </Box>
      </FrameWithRecentlyViewed>
    </AppContainer>
  )
})

export const CollectAppFragmentContainer = createFragmentContainer(CollectApp, {
  marketingHubCollections: graphql`
    fragment Collect_marketingHubCollections on MarketingCollection
      @relay(plural: true) {
      ...CollectionsHubsNav_marketingHubCollections
    }
  `,
})
