import { Box, Button, Sans, Serif } from "@artsy/palette"
import { ArtistConsignHeader_artist } from "__generated__/ArtistConsignHeader_artist.graphql"
import {
  LightPurpleColor,
  SectionContainer,
} from "Apps/Artist/Routes/Consign/Components/SectionContainer"
import { AnalyticsSchema, useTracking } from "Artsy"
import { RouterLink } from "Artsy/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { ArtistConsignHeaderImagesFragmentContainer as ArtistConsignHeaderImages } from "./ArtistConsignHeaderImages"

interface ArtistConsignHeaderProps {
  artist: ArtistConsignHeader_artist
}

export const ArtistConsignHeader: React.FC<ArtistConsignHeaderProps> = ({
  artist,
}) => {
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
              <ArtistConsignHeaderImages artist={artist} />
            </Box>
          )
        }}
      </Media>

      <Box textAlign="center">
        <Box>
          <Serif element="h1" size={["10", "12"]}>
            Sell Works by <br />
            {artist.name}
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

export const ArtistConsignHeaderFragmentContainer = createFragmentContainer(
  ArtistConsignHeader,
  {
    artist: graphql`
      fragment ArtistConsignHeader_artist on Artist {
        ...ArtistConsignHeaderImages_artist
        name
      }
    `,
  }
)
