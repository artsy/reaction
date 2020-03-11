import React from "react"

import { Box, Flex, Sans, Serif } from "@artsy/palette"

export const ArtistConsignFAQ: React.FC = props => {
  return (
    <Box>
      <Box>
        <Serif size="8">Frequently asked questions</Serif>
      </Box>

      <Flex>
        <Box>
          <Box>
            <Sans size="3">Why sell with Artsy?</Sans>
          </Box>
          <Box>
            <Sans size="3">
              Artsy wants to make it seamless and worthwhile to consign and
              resell art. Our experts ensure that you receive the most
              competitive offers and sales terms.
            </Sans>
          </Box>
        </Box>
        <Box>
          <Box>
            <Sans size="3">What happens once I submit a work?</Sans>
          </Box>
          <Box>
            <Sans size="3">
              First, Artsy will review your submission, and notify you if it is
              accepted. Once accepted we will share it with our network of
              interested sellers. Once a seller makes an offer, you can review
              and respond to the consignment proposal via email. Finally, if you
              would like to move forward, we will help you coordinate the
              handoff every step of the way.
            </Sans>
          </Box>
        </Box>
        <Box>
          <Box>
            <Sans size="3">What are the fees?</Sans>
          </Box>
          <Box>
            <Sans size="3">
              There is no fee to submit, or for Artsy’s consultation services.
              If you decide to sell the work, we will help you negotiate
              additional fees like commission, shipping, insurance, and
              photography.
            </Sans>
          </Box>
        </Box>
        <Box>
          <Box>
            <Sans size="3">What types of artworks do you accept?</Sans>
          </Box>
          <Box>
            <Sans size="3">
              To determine if your work qualifies, our expert staff assesses if
              your artist’s work has sufficient resale market and demand (the
              number, recency, and value of auction results). Then we review
              important authenticity, provenance information and artwork details
              you provided. We require several images (front, back, signature),
              unframed dimensions, provenance, and a Certificate of
              Authenticity, as well as any additional documentation. Generally,
              we accept artworks valued at $5,000 or more.
            </Sans>
          </Box>
        </Box>

        <Box>
          <Box>
            <Sans size="3">How quickly will I hear from Artsy?</Sans>
          </Box>
          <Box>
            <Sans size="3">
              If your work is approved, expect to hear from us within 7 business
              days. To learn about the status of your consignment submission,
              please email{" "}
              <a href="mailto:consign@artsty.net">consign@artsty.net</a> or call
              +1 646 797 3423.
            </Sans>
          </Box>
        </Box>
        <Box>
          <Box>
            <Sans size="3">Want to learn more about selling with Artsy?</Sans>
          </Box>
          <Box>
            <Sans size="3">
              Read our full <a href="#todo">FAQ</a> or{" "}
              <a href="#todo">contact us.</a>
            </Sans>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
