import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { ContextProvider } from "Artsy/SystemContext"
import { FollowArtistPopoverQueryRenderer } from "Components/v2/FollowArtistPopover"

storiesOf("Components/v2/FollowArtistPopover", module).add(
  "Pablo Picasso",
  () => {
    return (
      <ContextProvider>
        <FollowArtistPopoverQueryRenderer artistID="pablo-picasso" />
      </ContextProvider>
    )
  }
)
