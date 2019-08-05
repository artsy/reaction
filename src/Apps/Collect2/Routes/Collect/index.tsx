import { Box, Flex, Sans, Serif } from "@artsy/palette"
import { getMetadataForMedium } from "Apps/Collect2/Utils/getMetadataForMedium"
import { AppContainer } from "Apps/Components/AppContainer"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { ArtworkFilterRefetchContainer as ArtworkFilter } from "Components/v2/ArtworkFilter"
import { FilterContextProvider } from "Components/v2/ArtworkFilter/ArtworkFilterContext"
import { BreadCrumbList } from "Components/v2/Seo"
import React from "react"
import { Link, Meta, Title } from "react-head"
import { data as sd } from "sharify"

export const CollectApp = props => {
  const { params } = props
  const medium = params && params.medium
  const { description, breadcrumbTitle, title } = getMetadataForMedium(medium)
  const canonicalHref = medium
    ? `${sd.APP_URL}/collect/${medium}`
    : `${sd.APP_URL}/collect`

  return (
    <FilterContextProvider
    // Add dynamic tracking, to be handled in context
    // filters={{
    //   ...initialFilterState,
    //   keyword: term,
    // }}
    >
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

            <Sans size="3" weight="medium">
              <a href="/collections">View collections</a>
            </Sans>
          </Flex>
          <Box>
            <ArtworkFilter viewer={props.viewer} />
          </Box>
        </FrameWithRecentlyViewed>
      </AppContainer>
    </FilterContextProvider>
  )
}
