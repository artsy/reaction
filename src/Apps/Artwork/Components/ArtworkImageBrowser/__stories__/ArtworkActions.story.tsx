import { Flex } from "@artsy/palette"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtworkActions } from "../ArtworkActions"

storiesOf("Apps/Artwork Page/Components/ArtworkImageBrowser", module).add(
  "ArtworkActions",
  () => (
    <Flex justifyContent="center" alignItems="flex-end" height="500px">
      <RelayStubProvider>
        <ArtworkActions artwork={{} as any} />
      </RelayStubProvider>
    </Flex>
  )
)
