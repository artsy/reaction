import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { SaveButton } from "../SaveButton"

function SaveButtonExample() {
  return (
    <Flex justifyContent="center" alignItems="flex-end" height="500px">
      <SaveButton />
    </Flex>
  )
}

storiesOf("Styleguide/Artwork", module).add("SaveButton", () => (
  <SaveButtonExample />
))
