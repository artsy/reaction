import React from "react"

import {
  AuctionIcon,
  Box,
  Button,
  EditIcon,
  EnvelopeIcon,
  Flex,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "Artsy"
import { RouterLink } from "Artsy/Router/RouterLink"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

export const ArtistConsignHowtoSell: React.FC = props => {
  const tracking = useTracking()

  return (
    <SectionContainer height="100%" background="black10">
      <Box textAlign="center">
        <Subheader>How to sell your collection with Artsy</Subheader>

        <Spacer my={2} />

        <Flex
          flexDirection={["column", "row"]}
          alignItems="center"
          justifyContent="center"
        >
          <Section
            icon={<EditIcon width={30} height={30} />}
            text="Submit once"
            description="Submit your artwork details and images. Artsy will review and
            approve qualified submissions for consignment."
          />
          <Section
            icon={<EnvelopeIcon width={30} height={30} />}
            text="Receive offers"
            description="If your work is accepted, you’ll receive competitive consignment
            offers from auction houses, galleries, and collectors."
          />
          <Section
            icon={<AuctionIcon width={30} height={30} />}
            text="Match & sell"
            description="With our specialists’ expert guidance and advisement, evaluate
            your offers, choose the best offer for you and sell your work."
          />
        </Flex>

        <Spacer mt={6} />

        <Box>
          <RouterLink
            to="/consign/submission"
            onClick={() => {
              tracking.trackEvent({
                action_type: AnalyticsSchema.ActionType.Click,
                context_module:
                  AnalyticsSchema.ContextModule.HowToSellYourCollection,
                flow: AnalyticsSchema.Flow.Consignments,
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

const Section: React.FC<{
  icon: React.ReactNode
  text: string
  description: string
}> = ({ icon, text, description }) => {
  return (
    <Box width={["100%", "33%"]} height={["100%", 170]} my={[3, 0]} mx={1}>
      <Box>{icon}</Box>
      <Box mt={1} mb={2}>
        <Sans size="5">{text}</Sans>
      </Box>
      <Box>
        <Serif size="4">{description}</Serif>
      </Box>
    </Box>
  )
}
