import { Flex, Serif } from "@artsy/palette"
import React from "react"

export const NoResultsPreview: React.SFC = () => {
  return (
    <Flex>
      <Serif size="2" color="black100">
        This artist does not have any work on Artsy yet.
      </Serif>
    </Flex>
  )
}
