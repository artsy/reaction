import React from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeaderFragmentContainer as FeatureHeader } from "./Components/FeatureHeader"
import { FeatureFeaturedLink } from "./Components/FeatureFeaturedLink"
import { FeatureSet } from "./Components/FeatureSet"
import { FeatureApp_feature } from "__generated__/FeatureApp_feature.graphql"
import { Box, Sans, Spacer } from "@artsy/palette"
import { FEATURED_LINK } from "./Components/__tests__/fixtures"

interface FeatureAppProps {
  feature: FeatureApp_feature
}

const FeatureApp: React.FC<FeatureAppProps> = ({ feature }) => {
  return (
    <AppContainer maxWidth="100%">
      <Box height="100vh">
        <FeatureHeader feature={feature} />
      </Box>

      <Box maxWidth={["100%", 460]} mx="auto" my={3} px={3}>
        <Sans size="4">
          {/* Feature#description */}
          Art-world spaces have paused, museums and galleries have closed their
          doors, exhibitions have canceled, and auctions and fairs have been
          postponed. Still, even in times of crisis, art can bring us closer and
          keep us connected across time and place. And in times of crises, art
          continues to move us and keeps going, and and keeps us connected.
        </Sans>

        <Spacer my={3} />

        <Sans size="6">
          {/* Feature#callOut */}
          Featuring: Greene Naftali, Petzel, Andrew Kreps, Skarstedt, CLEARING,
          The Journal Gallery, CANADA, Company Gallery, Van Doren Waxter, Jack
          Hanley, Matthew Marks, Gavin Brown, Perrotin, James Fuentes, Gagosian,
          David Zwirnir, Galerie Lelong, Sikkema Jenkins, Two Palms, Pace,
          Lisson, Hauser &amp; Wirth
        </Sans>
      </Box>

      <FeatureSet mx={3}>
        <FeatureFeaturedLink wide featuredLink={FEATURED_LINK} />
      </FeatureSet>

      <FeatureSet mx={3}>
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
      </FeatureSet>

      <FeatureSet mx={3}>
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
      </FeatureSet>

      <FeatureSet mx={3}>
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
      </FeatureSet>

      <FeatureSet mx={3}>
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
        <FeatureFeaturedLink featuredLink={FEATURED_LINK} />
      </FeatureSet>
    </AppContainer>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(FeatureApp, {
  feature: graphql`
    fragment FeatureApp_feature on Feature {
      ...FeatureHeader_feature
    }
  `,
})
