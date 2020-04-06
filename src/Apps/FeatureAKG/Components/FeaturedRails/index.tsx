import { Box, Image, Sans, Spacer } from "@artsy/palette"
import { FeaturedRails_viewer } from "__generated__/FeaturedRails_viewer.graphql"
import { StyledLink } from "Apps/Artist/Components/StyledLink"
import { FeaturedAuctionsRailFragmentContainer as FeaturedAuctions } from "Apps/FeatureAKG/Components/FeaturedRails/FeaturedAuctions"
import { FeaturedCollectionsRailFragmentContainer as FeaturedCollections } from "Apps/FeatureAKG/Components/FeaturedRails/FeaturedCollections"
import { FeaturedFairsRailFragmentContainer as FeaturedFairs } from "Apps/FeatureAKG/Components/FeaturedRails/FeaturedFairs"
import { Carousel } from "Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { crop } from "Utils/resizer"

interface FeaturedRailsProps {
  viewer: FeaturedRails_viewer
  collections_rail: RailMetadata
  auctions_rail: RailMetadata
  fairs_rail: RailMetadata
}

const FeaturedRails: React.FC<FeaturedRailsProps> = props => {
  const hasCollectionsRail = props.collections_rail?.items?.length
  const hasAuctionsRail = props.auctions_rail?.items?.length
  const hasFairsRail = props.fairs_rail?.items?.length

  return (
    <Box>
      {hasCollectionsRail && (
        <>
          <FeaturedCollections
            collections={props.viewer.collections}
            railMetadata={props.collections_rail}
          />
          <Spacer pb={3} />
        </>
      )}

      {hasAuctionsRail && (
        <>
          <FeaturedAuctions
            auctions={props.viewer.auctions}
            railMetadata={props.auctions_rail}
          />
          <Spacer pb={3} />
        </>
      )}

      {hasFairsRail && (
        <>
          <FeaturedFairs
            fairs={props.viewer.fairs}
            railMetadata={props.fairs_rail}
          />
          <Spacer pb={3} />
        </>
      )}
    </Box>
  )
}

export const FeaturedRailsFragmentContainer = createFragmentContainer(
  FeaturedRails,
  {
    viewer: graphql`
      fragment FeaturedRails_viewer on Viewer
        @argumentDefinitions(
          collectionRailItemIDs: { type: "[String!]" }
          auctionRailItemIDs: { type: "[String!]" }
          fairRailItemIDs: { type: "[String!]" }
        ) {
        collections: marketingCollections(slugs: $collectionRailItemIDs) {
          ...FeaturedCollections_collections
        }
        auctions: salesConnection(first: 50, id: $auctionRailItemIDs) {
          ...FeaturedAuctions_auctions
        }
        fairs: fairs(ids: $fairRailItemIDs) {
          ...FeaturedFairs_fairs
        }
      }
    `,
  }
)

export interface RailMetadata {
  title: string
  subtitle: string
  items: [{ image_src: string; id: string }]
}

interface FeaturedRailProps {
  title: string
  subtitle: string
}

export const FeaturedRail: React.FC<FeaturedRailProps> = props => {
  const { children, title, subtitle } = props

  return (
    <Box>
      {title && (
        <Sans size="4" mb={1}>
          {title}
        </Sans>
      )}
      {subtitle && (
        <Sans size="2" color="black60" mb={1}>
          {subtitle}
        </Sans>
      )}
      {children}
    </Box>
  )
}

interface FeaturedRailCarouselProps {
  itemsForCarousel: Array<{
    imageSrc: string
    title: string
    subtitle: string
    href: string
  }>
}

export const FeaturedRailCarousel: React.FC<FeaturedRailCarouselProps> = props => {
  const { itemsForCarousel } = props

  return (
    <Carousel
      height="325px"
      data={itemsForCarousel}
      options={{ pageDots: false }}
      render={item => {
        const croppedImageUrl = crop(item.imageSrc, {
          width: 245,
          height: 270,
        })

        return (
          <Box mr={1} maxWidth="245px">
            <StyledLink to={item.href}>
              <Image src={croppedImageUrl} />
              <Sans size="2" weight="medium" mt={1}>
                {item.title}
              </Sans>
              <Sans size="2">{item.subtitle}</Sans>
            </StyledLink>
          </Box>
        )
      }}
    />
  )
}
