import { Box, Button, Sans, Serif } from "@artsy/palette"
import React from "react"

import { Consign_artworksByInternalID } from "__generated__/Consign_artworksByInternalID.graphql"

import { ArtistConsignment } from "Apps/Artist/Routes/Consign/Utils/getConsignmentData"
import { AnalyticsSchema, useTracking } from "Artsy"
import { RouterLink } from "Artsy/Router/RouterLink"
import { Media } from "Utils/Responsive"

import {
  LightPurpleColor,
  SectionContainer,
} from "Apps/Artist/Routes/Consign/Components/SectionContainer"
import { HeaderImages } from "./HeaderImages"

interface ArtistConsignHeaderProps {
  artistConsignment: ArtistConsignment
  artistName: string
  artworksByInternalID: Consign_artworksByInternalID
}

export const ArtistConsignHeader: React.FC<ArtistConsignHeaderProps> = props => {
  const tracking = useTracking()

  return (
    <SectionContainer background={LightPurpleColor}>
      <Media greaterThan="xs">
        {classNames => {
          return (
            <Box
              className={classNames}
              position="absolute"
              width="100%"
              height="100%"
            >
              <HeaderImages artworksByInternalID={props.artworksByInternalID} />
            </Box>
          )
        }}
      </Media>

      <Box textAlign="center">
        <Box>
          <Serif element="h1" size={["10", "12"]}>
            Sell Works by <br />
            {props.artistName}
          </Serif>
        </Box>

        <Box mt={3} mb={4}>
          <Sans element="h2" size="4t">
            With Artsy's expert guidance, selling is simple
          </Sans>
        </Box>

        <Box>
          <RouterLink
            to="/consign/submission"
            onClick={() => {
              tracking.trackEvent({
                action_type: AnalyticsSchema.ActionType.Click,
                context_module: AnalyticsSchema.ContextModule.SellWorksBy,
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
