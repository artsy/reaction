import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ShareButton } from "../../ArtworkBrowser/ActionButtons"

storiesOf(
  "Apps/Artwork Page/Components/ArtworkBrowser/ActionButtons",
  module
).add("Share button", () => (
  <Flex justifyContent="center" alignItems="flex-end" height="500px">
    <ShareButton href="/some/artwork/href" />
  </Flex>
))
