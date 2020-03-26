import React from "react"

import { Box, Button, Sans, Serif } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "Artsy"
import { RouterLink } from "Artsy/Router/RouterLink"
import { LightPurpleColor, SectionContainer } from "./SectionContainer"

export const ArtistConsignSellArt: React.FC = props => {
  const tracking = useTracking()

  return (
    <SectionContainer background={LightPurpleColor}>
      <Box textAlign="center">
        <Box>
          <Serif element="h2" size={["10", "12"]}>
            Sell Art <br />
            From Your Collection
          </Serif>
        </Box>

        <Box mt={3} mb={4}>
          <Sans size="4t">With Artsy's expert guidance, selling is simple</Sans>
        </Box>

        <Box>
          <RouterLink
            to="/consign/submission"
            onClick={() => {
              tracking.trackEvent({
                action_type: AnalyticsSchema.ActionType.Click,
                context_module:
                  AnalyticsSchema.ContextModule.SellArtFromYourCollection,
                subject: AnalyticsSchema.Subject.RequestPriceEstimate,
              })
            }}
          >
            <Button>Request a price estimate</Button>
          </RouterLink>
        </Box>
      </Box>
    </SectionContainer>
  )
}
