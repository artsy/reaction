import React from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { FeatureApp_feature } from "__generated__/FeatureApp_feature.graphql"

interface FeatureAppProps {
  children: React.ReactNode
  feature: FeatureApp_feature
}

const FeatureApp: React.FC<FeatureAppProps> = ({ children, feature }) => {
  return (
    <AppContainer maxWidth="100%">
      <Box my={3}>{feature.name}</Box>
      {children}
    </AppContainer>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(FeatureApp, {
  feature: graphql`
    fragment FeatureApp_feature on Feature {
      name
    }
  `,
})
