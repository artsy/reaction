import { Box } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { ComparablesContainer } from "Apps/Comparables"
import { ContextProvider } from "Artsy"
import React from "react"
import { Provider as StateProvider } from "unstated"

storiesOf("Apps/Comparables", module).add("albers", () => {
  return (
    <Box p={6} pt={2}>
      <StateProvider>
        <ContextProvider>
          <ComparablesContainer artworkID="josef-albers-wls-i-from-white-line-squares-series-i" />
        </ContextProvider>
      </StateProvider>
    </Box>
  )
})
