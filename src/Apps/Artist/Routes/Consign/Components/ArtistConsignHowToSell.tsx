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

export const ArtistConsignHowtoSell: React.FC = props => {
  return (
    <SectionContainer height={480} background="black10">
      <Box textAlign="center">
        <Box>
          <Serif size="10">How to sell your collection with Artsy</Serif>
        </Box>

        <Spacer my={2} />

        <Flex>
          <Box width={335} height={170}>
            <Box>
              <EditIcon width={30} height={30} />
            </Box>
            <Box mt={1} mb={2}>
              <Sans size="5">Submit once</Sans>
            </Box>
            <Box>
              <Serif size="4">
                Submit your artwork details and images. Artsy will review and
                approve qualified submissions for consignment.
              </Serif>
            </Box>
          </Box>
          <Box width={335} height={170}>
            <Box>
              <EnvelopeIcon width={30} height={30} />
            </Box>
            <Box mt={1} mb={2}>
              <Sans size="5">Receive offers</Sans>
            </Box>
            <Box>
              <Serif size="4">
                If your work is accepted, you’ll receive competitive consignment
                offers from auction houses, galleries, and collectors.
              </Serif>
            </Box>
          </Box>
          <Box width={335} height={170}>
            <Box>
              <AuctionIcon width={30} height={30} />
            </Box>
            <Box mt={1} mb={2}>
              <Sans size="5">Match & sell</Sans>
            </Box>
            <Box>
              <Serif size="4">
                With our specialists’ expert guidance and advisement, evaluate
                your offers, choose the best offer for you and sell your work.
              </Serif>
            </Box>
          </Box>
        </Flex>

        <Spacer mt={6} />

        <Box>
          <Button>Request a price estimate</Button>
        </Box>
      </Box>
    </SectionContainer>
  )
}
