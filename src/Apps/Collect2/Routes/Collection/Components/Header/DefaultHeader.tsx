import { Box, color, Flex, Image, media, space } from "@artsy/palette"
import { DefaultHeader_headerArtworks } from "__generated__/DefaultHeader_headerArtworks.graphql"
import { AnalyticsSchema } from "Artsy/Analytics"
import { useTracking } from "Artsy/Analytics/useTracking"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useWindowSize } from "Utils/Hooks/useWindowSize"

interface CollectionDefaultHeaderProps {
  headerArtworks: DefaultHeader_headerArtworks
  defaultHeaderImageHeight: number
  collection_id: string
  collection_slug: string
}

const IMAGE_MARGIN_X = 10
const LARGE_VIEWPORT_WIDTH = 880

export const CollectionDefaultHeader: FC<CollectionDefaultHeaderProps> = ({
  headerArtworks,
  defaultHeaderImageHeight,
  collection_id,
  collection_slug,
}) => {
  const { hits: artworks } = headerArtworks

  if (!artworks) {
    return null
  }

  const viewportWidth = useWindowSize().width
  const smallViewport = viewportWidth < LARGE_VIEWPORT_WIDTH
  /**
   * Relay is returning 12 artworks since this query populates both the artworks
   *  used for merchandisable artists and those used for this component.
   *  Slice the artworks array to get just the first 10 in the result set.
   */
  const duplicatedArtworks = artworks.slice(0, 10)
  const artworksToRender = getHeaderArtworks(
    duplicatedArtworks,
    viewportWidth,
    smallViewport
  )

  const { trackEvent } = useTracking()

  return (
    <header>
      <DefaultHeaderContainer
        position={["relative", "absolute"]}
        left={["auto", 0]}
        width={["auto", 1]}
        height={[160, 160, 250]}
      >
        <HeaderArtworks>
          {artworksToRender.map((artwork, i) => {
            return (
              <a
                href={artwork.href}
                key={artwork.href}
                onClick={() => {
                  trackEvent({
                    action_type: AnalyticsSchema.ActionType.Click,
                    context_module: AnalyticsSchema.ContextModule.ArtworkBanner,
                    context_page_owner_type:
                      AnalyticsSchema.OwnerType.Collection,
                    context_page: AnalyticsSchema.PageName.CollectionPage,
                    context_page_owner_id: collection_id,
                    context_page_owner_slug: collection_slug,
                    destination_path: artwork.href,
                  })
                }}
              >
                <HeaderImage
                  height={defaultHeaderImageHeight}
                  src={
                    smallViewport
                      ? (artwork.image.small.url as string)
                      : (artwork.image.large.url as string)
                  }
                  preventRightClick
                />
              </a>
            )
          })}
        </HeaderArtworks>
      </DefaultHeaderContainer>
    </header>
  )
}

export const getHeaderArtworks = (
  artworksArray: any[],
  headerWidth: number,
  isSmallViewport: boolean
) => {
  let artworkWidths = 0
  let shouldAppendDuplicateArtworksToHeader = true
  const headerArtworks: any[] = []

  if (artworksArray.length < 1) {
    return [] as any[]
  }

  /**
   * Loop through the initial artworks array, appending an artwork to the output array,
   * until the summed widths of the artworks in the output array are greater than the
   * width of the viewport.
   */
  while (shouldAppendDuplicateArtworksToHeader) {
    for (const artwork of artworksArray) {
      if (artworkWidths > headerWidth) {
        headerArtworks.push(artwork)
        shouldAppendDuplicateArtworksToHeader = false
        return headerArtworks
      }

      headerArtworks.push(artwork)

      isSmallViewport
        ? (artworkWidths += artwork.image.small.width + IMAGE_MARGIN_X)
        : (artworkWidths += artwork.image.large.width + IMAGE_MARGIN_X)
    }
  }
}

export const CollectionDefaultHeaderFragmentContainer = createFragmentContainer(
  CollectionDefaultHeader,
  {
    headerArtworks: graphql`
      fragment DefaultHeader_headerArtworks on FilterArtworks {
        hits {
          href
          id
          image {
            small: resized(height: 160) {
              url
              width
              height
            }
            large: resized(height: 220) {
              url
              width
              height
            }
          }
        }
      }
    `,
  }
)

const DefaultHeaderContainer = styled(Box)`
  background-color: ${color("black5")};
  overflow: hidden;

  ${media.xs`
    margin-left: -20px;
    margin-right: -20px;
  `};
`
const HeaderArtworks = styled(Flex)`
  flex-direction: row;
  position: absolute;
  bottom: 0;

  & a:first-child > img {
    margin-left: 0px;
  }

  & a:last-child > img {
    margin-left: 0px;
  }
`
const HeaderImage = styled(Image)`
  margin-right: ${space(0.5)}px;
  margin-left: ${space(0.5)}px;
`
