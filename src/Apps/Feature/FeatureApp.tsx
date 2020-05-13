import React from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeaderFragmentContainer as FeatureHeader } from "./Components/FeatureHeader"
import { FeatureApp_feature } from "__generated__/FeatureApp_feature.graphql"
import { Box, Join, Sans, Spacer } from "@artsy/palette"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { FeatureSetFragmentContainer as FeatureSet } from "./Components/FeatureSet"

interface FeatureAppProps {
  feature: FeatureApp_feature
}

const FeatureApp: React.FC<FeatureAppProps> = ({ feature }) => {
  return (
    <>
      <Box height="100vh">
        <FeatureHeader feature={feature} />
      </Box>

      <AppContainer>
        <HorizontalPadding>
          {(feature.description || feature.callOut) && (
            <Box maxWidth={["100%", 460]} mx="auto" my={3} px={3}>
              <Join separator={<Spacer my={3} />}>
                {feature.description && (
                  <Sans size="4">
                    <Box
                      dangerouslySetInnerHTML={{ __html: feature.description }}
                    />
                  </Sans>
                )}

                {feature.callOut && (
                  <Sans size="6">
                    <Box
                      dangerouslySetInnerHTML={{ __html: feature.callOut }}
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
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(FeatureApp, {
  feature: graphql`
    fragment FeatureApp_feature on Feature {
      ...FeatureHeader_feature
      description(format: HTML)
      # TODO: Placeholder value
      callOut: description(format: HTML)
      # TODO: Handle pagination
      sets: setsConnection(first: 50) {
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
