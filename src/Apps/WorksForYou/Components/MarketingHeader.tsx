import React, { SFC } from "react"

import {
  BorderBox,
  Box,
  Button,
  Flex,
  Sans,
  Separator,
  Spacer,
  themeProps,
} from "@artsy/palette"

export const MarketingHeader: SFC = () => {
  return (
    <>
      <BorderBox
        width="100%"
        height="220px"
        background={themeProps.colors.black5}
      />

      <Spacer mb={1} />

      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Sans size="3">Introducing a new way to buy on Artsy</Sans>
          <Sans size="3" color={themeProps.colors.black60}>
            A new selection of works available for immediate purchase and offer
          </Sans>
        </Box>
        <Button>Browse works</Button>
      </Flex>

      <Spacer mb={5} />

      <Separator />
    </>
  )
}
