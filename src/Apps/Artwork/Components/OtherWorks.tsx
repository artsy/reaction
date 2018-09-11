import { Button, Flex, Serif } from "@artsy/palette"
import React from "react"
import { FullArtworkGrid } from "Styleguide/Components"

export const OtherWorks = ({ headline }) => (
  <Flex flexDirection="column" alignItems="center">
    <Serif size="8" color="black100" mb={2}>
      {headline}
    </Serif>
    <Button variant="secondaryOutline" mb={3}>
      View all
    </Button>
    <FullArtworkGrid artistID="banksy" />
  </Flex>
)
