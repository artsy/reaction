import { Box, Theme } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtistCollectionsRailContent as ArtistCollectionsRail } from "../Artist/ArtistCollectionsRail"

storiesOf("Components/Artist/CollectionsRail", module).add(
  "Artist Collections Rail",
  () => (
    <Theme>
      <Box maxWidth={1192} px={4}>
        <ArtistCollectionsRail artistID="4d8b92b34eb68a1b2c0003f4" />
        <ArtistCollectionsRail artistID="4db443766c0cee66480004ca" />
        <ArtistCollectionsRail artistID="4d8d12a3876c697ae1000059" />
      </Box>
    </Theme>
  )
)
