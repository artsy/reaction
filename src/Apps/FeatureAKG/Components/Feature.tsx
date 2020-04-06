import { Box, Image, Sans, Serif } from "@artsy/palette"
import { Feature_viewer } from "__generated__/Feature_viewer.graphql"
import { FeaturedArticlesFragmentContainer as FeaturedArticles } from "Apps/FeatureAKG/Components/FeaturedArticles"
import { FeaturedArtists } from "Apps/FeatureAKG/Components/FeaturedArtists"
import { FeaturedRailsFragmentContainer as FeaturedRails } from "Apps/FeatureAKG/Components/FeaturedRails"
import { FeaturedThisWeek } from "Apps/FeatureAKG/Components/FeaturedThisWeek"
import { SelectedWorksFragmentContainer as SelectedWorks } from "Apps/FeatureAKG/Components/SelectedWorks"
import { RouterLink } from "Artsy/Router/RouterLink"
import { useSystemContext } from "Artsy/SystemContext"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { crop } from "Utils/resizer"
import { Media } from "Utils/Responsive"

interface FeatureProps {
  viewer: Feature_viewer
}

const Feature: React.FC<FeatureProps> = props => {
  const { injectedData } = useSystemContext()

  if (!injectedData) {
    return null
  }

  const featuredThisWeek = injectedData.featured_this_week
  const editorial = injectedData.editorial
  const selectedWorks = injectedData.selected_works
  const featuredArtists = injectedData.featured_artists
  const featuredRails = injectedData.browse
  const heroVideo = injectedData.hero_video
  const video1 = injectedData.video_1
  const video2 = injectedData.video_2

  const showRails =
    featuredRails?.collections_rail?.items?.length ||
    featuredRails?.auctions_rail?.items?.length ||
    featuredRails?.fairs_rail?.items?.length

  return (
    <>
      <Media greaterThanOrEqual="md">
        {heroVideo?.large_src && (
          <Box textAlign="center">
            <Video src={heroVideo.large_src} />
          </Box>
        )}
      </Media>
      <Media lessThan="md">
        {heroVideo?.small_src && (
          <Box textAlign="center">
            <Video src={heroVideo.small_src} />
          </Box>
        )}
      </Media>
      <Box pt="3" maxWidth="475px" m="0 auto">
        <Sans size="4" mx="3" weight="medium">
          {injectedData.description}
        </Sans>
      </Box>

      {/* Featured this week */}
      <Section
        title={featuredThisWeek.title}
        subtitle={featuredThisWeek.subtitle}
      >
        <FeaturedThisWeek {...featuredThisWeek} />
      </Section>

      {/* Editorial */}
      {editorial?.article_ids?.length && (
        <Section title={editorial.title} subtitle={editorial.subtitle}>
          <FeaturedArticles {...editorial} articles={props.viewer.articles} />
        </Section>
      )}

      {/* Video 1 */}
      <Media greaterThanOrEqual="md">
        {video1?.large_src && <VideoSection src={video1.large_src} />}
      </Media>
      <Media lessThan="md">
        {video1?.small_src && <VideoSection src={video1.small_src} />}
      </Media>

      {/* Selected works */}
      {selectedWorks?.set_id && (
        <Section title={selectedWorks.title} subtitle={selectedWorks.subtitle}>
          <SelectedWorks
            {...selectedWorks}
            selectedWorks={props.viewer.selectedWorks}
          />
        </Section>
      )}

      {/* Video 2 */}
      <Media greaterThanOrEqual="md">
        {video2?.large_src && <VideoSection src={video2.large_src} />}
      </Media>
      <Media lessThan="md">
        {video2?.small_src && <VideoSection src={video2.small_src} />}
      </Media>

      {/* Featured Artists */}
      {featuredArtists?.artists?.length && (
        <Section
          title={featuredArtists.title}
          subtitle={featuredArtists.subtitle}
        >
          <FeaturedArtists {...featuredArtists} />
        </Section>
      )}

      {/* Browse */}
      {showRails && (
        <Section title={featuredRails.title} subtitle={featuredRails.subtitle}>
          <FeaturedRails {...featuredRails} viewer={props.viewer} />
        </Section>
      )}
    </>
  )
}

export const FeatureFragmentContainer = createFragmentContainer(Feature, {
  viewer: graphql`
    fragment Feature_viewer on Viewer
      @argumentDefinitions(
        articleIDs: { type: "[String]!" }
        selectedWorksSetID: { type: "String!" }
        collectionRailItemIDs: { type: "[String!]" }
        auctionRailItemIDs: { type: "[String!]" }
        fairRailItemIDs: { type: "[String!]" }
      ) {
      articles: articles(ids: $articleIDs) {
        ...FeaturedArticles_articles
      }
      selectedWorks: orderedSet(id: $selectedWorksSetID) {
        ...SelectedWorks_selectedWorks
      }
      ...FeaturedRails_viewer
        @arguments(
          collectionRailItemIDs: $collectionRailItemIDs
          auctionRailItemIDs: $auctionRailItemIDs
          fairRailItemIDs: $fairRailItemIDs
        )
    }
  `,
})

interface SectionProps {
  title: string
  subtitle: string
}

const Section: React.FC<SectionProps> = props => {
  const { title, subtitle } = props

  return (
    <Box>
      <SectionSeparator my="4" />
      <Box px={["2", "3"]}>
        <Box mb={3}>
          {title && <TitleText size="3">{title}</TitleText>}
          {subtitle && (
            <Sans size="3" color="black60" my={1}>
              {subtitle}
            </Sans>
          )}
        </Box>
        {props.children}
      </Box>
    </Box>
  )
}

const VideoSection: React.FC<{ src: string }> = props => {
  // Constrain the height, add 1px for the border
  return (
    <Box mb="-40px" height="591px">
      <SectionSeparator mt="4" />
      <Box textAlign="center">
        <Video src={props.src} />
      </Box>
    </Box>
  )
}

const Video: React.FC<{ src: string }> = props => {
  return (
    <video autoPlay loop muted playsInline controls={false} src={props.src} />
  )
}

export interface FeaturedLinkType {
  image_src: string
  description: string
  subtitle: string
  title: string
  url: string
  byline?: string
  size?: "medium" | "large"
}

export const FeaturedContentLink: React.FC<FeaturedLinkType> = props => {
  const size = props.size ? props.size : "medium"

  const width = size === "medium" ? 350 : 470
  const height = size === "medium" ? 435 : 490

  const croppedUrl = crop(props.image_src, {
    width,
    height,
  })

  return (
    <StyledLink to={props.url}>
      <Box position="relative">
        <Image src={croppedUrl} width="100%" />
        <ImageOverlayText maxWidth="150px">
          <BlockText size="2" color="white">
            {props.title}
          </BlockText>
          {props.byline && (
            <Sans size="2" color="white">
              {props.byline}
            </Sans>
          )}
        </ImageOverlayText>
      </Box>
      <Sans size="2" my={1}>
        {props.subtitle}
      </Sans>
      <Serif size="2">{props.description}</Serif>
    </StyledLink>
  )
}

const StyledLink = styled(RouterLink)`
  text-decoration: none;
`

const TitleText = styled(Sans)`
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 30px;
  font-size: 33px;
  max-width: 275px;
`

const BlockText = styled(Sans)`
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 24px;
  font-size: 27px;
  max-width: 220px;
`

const ImageOverlayText = styled(Box)`
  position: absolute;
  bottom: 20px;
  left: 20px;
`

const SectionSeparator = styled(Box)`
  border: 1px solid #000000;
`
