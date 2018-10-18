import { Box } from "@artsy/palette"
import { ComparablesContainer } from "Apps/Comparables"
import { ContextProvider } from "Artsy"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

const mediator = { trigger: () => null }

storiesOf("Apps/Comparables", module).add("albers", () => {
  return (
    <Box p={6} pt={2}>
      <ContextProvider mediator={mediator}>
        <ComparablesContainer artworkID="damien-hirst-spin-2" />
      </ContextProvider>
    </Box>
  )
})

storiesOf("Apps/Comparables", module).add("input", () => {
  return (
    <Box p={6} pt={2}>
      <ContextProvider mediator={mediator}>
        <ComparablesContainer />
      </ContextProvider>
    </Box>
  )
})
