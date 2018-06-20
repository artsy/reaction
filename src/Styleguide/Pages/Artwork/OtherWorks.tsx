import React from "react"
import { Flex } from "Styleguide/Elements/Flex"
import { Serif } from "@artsy/palette"
import { Button } from "Styleguide/Elements"
import { FullArtworkGrid } from "Styleguide/Components/ArtworkGrid"

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
