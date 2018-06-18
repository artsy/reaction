import { storiesOf } from "@storybook/react"
import React from "react"
import { Browser } from "../Containers/Artist/AuctionResults"

import { ContextProvider } from "../../../Components/Artsy"
import { Provider as StateProvider } from "unstated"

storiesOf("Containers/Artist/AuctionResults", module).add(
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
