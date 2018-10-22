import { Box } from "@artsy/palette"
import { ComparablesContainer } from "Apps/Comparables"
import { ContextProvider } from "Artsy"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

const mediator = { trigger: () => null }

storiesOf("Apps", module).add("Comparables", () => {
  return (
    <Box p={6} pt={2}>
      <ContextProvider mediator={mediator}>
        <ComparablesContainer />
      </ContextProvider>
    </Box>
  )
})
