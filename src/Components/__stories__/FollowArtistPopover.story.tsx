import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "Artsy"
import { FollowArtistPopoverQueryRenderer } from "Components/FollowArtistPopover"

storiesOf("Components/FollowArtistPopover", module).add("Pablo Picasso", () => {
  return (
    <SystemContextProvider>
      <FollowArtistPopoverQueryRenderer artistID="pablo-picasso" />
    </SystemContextProvider>
  )
})
