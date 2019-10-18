import { Box, Flex, Sans, Serif } from "@artsy/palette"
import React from "react"

export const PricingTransparency: React.FC<{}> = () => {
  return (
    <Flex pt={3} flexDirection="column">
      <Serif pb={1} size="4t" weight="semibold" color="black100">
        Summary
      </Serif>

      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
        pb={1}
      >
        <Box>
          <Serif size="3t" color="black100">
            Your max bid
          </Serif>
        </Box>
        <Box>
          <Serif size="3t" color="black100">
            £18,000
          </Serif>
        </Box>
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
        pb={2}
      >
        <Box>
          <Serif size="3t" color="black100">
            Buyer's Premium
          </Serif>
        </Box>
        <Box>
          <Serif size="3t" color="black100">
            £3,600
          </Serif>
        </Box>
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
        pb={1}
      >
        <Box>
          <Serif size="3t" color="black100">
            Subtotal
          </Serif>
        </Box>
        <Box>
          <Serif size="3t" color="black100">
            £21,600
          </Serif>
        </Box>
      </Flex>
      <Sans size="2" color="black60">
        Plus any applicable shipping, taxes, and fees.
      </Sans>
    </Flex>
  )
}
