import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "Artsy/SystemContext"
import { FollowArtistPopoverQueryRenderer } from "Styleguide/Components/FollowArtistPopover"

storiesOf("Styleguide/Components/FollowArtistPopover", module).add(
  "Pablo Picasso",
  () => {
    return (
      <SystemContextProvider>
        <FollowArtistPopoverQueryRenderer artistID="pablo-picasso" />
      </SystemContextProvider>
    )
  }
)
