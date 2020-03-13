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
import { SectionContainer } from "./SectionContainer"

const Section: React.FC<{
  icon: React.ReactNode
  text: string
  description: string
}> = ({ icon, text, description }) => {
  return (
    <Box width="33%" height={170} my={[3, 0]} mx={1}>
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

export const ArtistConsignHowtoSell: React.FC = props => {
  return (
    <SectionContainer background="black10">
      <Box textAlign="center">
        <Box>
          <Serif size="10">How to sell your collection with Artsy</Serif>
        </Box>

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
          <Button>Request a price estimate</Button>
        </Box>
      </Box>
    </SectionContainer>
  )
}
