import { storiesOf } from "@storybook/react"
import React from "react"
import { Browser } from "../ArtistFilter"

import { Provider as StateProvider } from "unstated"
import { ContextProvider } from "../Artsy"

storiesOf("Components/ArtistFilter/Browser", module).add(
  "Pablo Picasso",
  () => {
    return (
      <div>
        <ContextProvider>
          <StateProvider>
            <Browser artistID="pablo-picasso" />
          </StateProvider>
        </ContextProvider>
      </div>
    )
  }
)
