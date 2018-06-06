import { storiesOf } from "@storybook/react"
import React from "react"
import { Browser } from "../ArtistFilter"

import { ContextProvider } from "../Artsy"
import { Provider as StateProvider } from "unstated"

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
