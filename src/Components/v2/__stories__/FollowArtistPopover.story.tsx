import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "Artsy"
import { FollowArtistPopoverQueryRenderer } from "Components/v2/FollowArtistPopover"

storiesOf("Components/v2/FollowArtistPopover", module).add(
  "Pablo Picasso",
  () => {
    return (
      <SystemContextProvider>
        <FollowArtistPopoverQueryRenderer artistID="pablo-picasso" />
      </SystemContextProvider>
    )
  }
)
