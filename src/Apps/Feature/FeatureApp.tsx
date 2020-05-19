import React from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureMetaFragmentContainer as FeatureMeta } from "./Components/FeatureMeta"
import { FeatureHeaderFragmentContainer as FeatureHeader } from "./Components/FeatureHeader"
import { FeatureApp_feature } from "__generated__/FeatureApp_feature.graphql"
import { Box, Join, Sans, Separator, Spacer } from "@artsy/palette"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { FeatureSetFragmentContainer as FeatureSet } from "./Components/FeatureSet"
import { Footer } from "Components/Footer"

interface FeatureAppProps {
  feature: FeatureApp_feature
}

const FeatureApp: React.FC<FeatureAppProps> = ({ feature }) => {
  return (
    <>
      <FeatureMeta feature={feature} />
      <Box height="100vh">
        <FeatureHeader feature={feature} />
      </Box>

      <AppContainer>
        <HorizontalPadding>
          {(feature.description || feature.callout) && (
            <Box maxWidth={["100%", 460]} mx="auto" my={3} px={3}>
              <Join separator={<Spacer my={3} />}>
                {feature.description && (
                  <Sans size="4">
                    <Box
                      dangerouslySetInnerHTML={{ __html: feature.description }}
                    />
                  </Sans>
                )}

                {feature.callout && (
                  <Sans size="6">
                    <Box
                      dangerouslySetInnerHTML={{ __html: feature.callout }}
                    />
                  </Sans>
                )}
              </Join>
            </Box>
          )}

          {feature.sets.edges.length > 0 &&
            feature.sets.edges.map(
              ({ node: set }) => set && <FeatureSet key={set.id} set={set} />
            )}

          <Separator my={3} />

          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(FeatureApp, {
  feature: graphql`
    fragment FeatureApp_feature on Feature {
      ...FeatureMeta_feature
      ...FeatureHeader_feature
      description(format: HTML)
      callout(format: HTML)
      sets: setsConnection(first: 20) {
        edges {
          node {
            id
            ...FeatureSet_set
          }
        }
      }
    }
  `,
})
