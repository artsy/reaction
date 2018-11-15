import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ShareButton } from "../ShareButton"

function ShareButtonExample() {
  return (
    <Flex justifyContent="center" alignItems="flex-end" height="500px">
      <ShareButton />
    </Flex>
  )
}

storiesOf("Styleguide/Artwork", module).add("ShareButton", () => (
  <ShareButtonExample />
))
