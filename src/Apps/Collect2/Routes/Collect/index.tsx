import { Box, Flex, Sans, Serif } from "@artsy/palette"
// import { CollectFilterFragmentContainer as ArtworkGrid } from "Apps/Collect2/Components/Base/CollectFilterContainer"
// import { SeoProductsForArtworks } from "Apps/Collect2/Components/Seo/SeoProductsForArtworks"
import { AppContainer } from "Apps/Components/AppContainer"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { BreadCrumbList } from "Components/v2/Seo"
import { Link as RouterLink, Location, Router } from "found"
import React from "react"
import { Link, Meta, Title } from "react-head"
import { data as sd } from "sharify"
import { getMetadataForMedium } from "./CollectMediumMetadata"

// import { ArtworkFilter_viewer } from "__generated__/ArtworkFilter_viewer.graphql"
import { buildUrlForCollectApp } from "Apps/Collect2/Utils/urlBuilder"
import { ArtworkFilter } from "Components/v2/ArtworkFilter"

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

        <Flex
          mt={3}
          mb={4}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Serif size="8">
            <h1>Collect art and design online</h1>
          </Serif>

          <Box pb={0.3}>
            <Sans size="3" weight="medium">
              <RouterLink to="/collections">View collections</RouterLink>
            </Sans>
          </Box>
        </Flex>

        <Box>
          <ArtworkFilter
            viewer={viewer}
            filters={location.query}
            updateURLOnChange={filters => {
              const url = buildUrlForCollectApp(filters)
              router.push(url)
            }}
          />
        </Box>
      </FrameWithRecentlyViewed>
    </AppContainer>
  )
})
