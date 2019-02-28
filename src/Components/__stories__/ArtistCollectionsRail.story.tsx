import { Box, Theme } from "@artsy/palette"
import { CollectionsFixture } from "Apps/__tests__/Fixtures/Collections"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtistCollectionsRail } from "../Artist/CollectionsRail/CollectionsRail"

storiesOf("Components/Artist/CollectionsRail", module).add(
  "Artist Collections Rail",
  () => (
    <Theme>
      <Box maxWidth={1192} px={4}>
        <ArtistCollectionsRail collections={CollectionsFixture} />
      </Box>
    </Theme>
  )
)
