import { Box } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { ComparablesContainer } from "Apps/Comparables"
import { ContextProvider } from "Artsy"
import React from "react"

storiesOf("Apps/Comparables", module).add("albers", () => {
  return (
    <Box p={6} pt={2}>
      <ContextProvider>
        <ComparablesContainer artworkID="damien-hirst-spin-2" />
      </ContextProvider>
    </Box>
  )
})
