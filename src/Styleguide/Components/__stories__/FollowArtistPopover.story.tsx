import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { ContextProvider } from "Artsy/SystemContext"
import { FollowArtistPopoverQueryRenderer } from "Styleguide/Components/FollowArtistPopover"

storiesOf("Styleguide/Components/FollowArtistPopover", module).add(
  "Pablo Picasso",
  () => {
    return (
      <ContextProvider>
        <FollowArtistPopoverQueryRenderer artistID="pablo-picasso" />
      </ContextProvider>
    )
  }
)
