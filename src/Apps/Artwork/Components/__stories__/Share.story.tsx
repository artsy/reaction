import { Flex } from "@artsy/palette"
import { Share } from "Apps/Artwork/Components/ArtworkBrowser/Share"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Artwork", module).add("Share", () => {
  return (
    <Flex justifyContent="center">
      <Share url="http://example.com/of/a/super/duper/long/url/who/even/comes/up/with/these/slugs/because/are/they/even/readable/and/do/people/really/care/i/dont/know/dude/that/is/an/excellent/question" />
    </Flex>
  )
})
