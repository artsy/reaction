import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ShareButton } from "../ActionButton"

storiesOf("Styleguide/Artwork/ActionButtons", module).add(
  "Share button",
  () => (
    <Flex justifyContent="center" alignItems="flex-end" height="500px">
      <ShareButton href="/some/artwork/href" />
    </Flex>
  )
)
