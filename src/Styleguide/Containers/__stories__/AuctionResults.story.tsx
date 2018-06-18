import { storiesOf } from "storybook/storiesOf"
import React from "react"
import { AuctionResultsContainer } from "Styleguide/Containers/Artist/AuctionResults"

import { ContextProvider } from "../../../Components/Artsy"
import { Provider as StateProvider } from "unstated"

storiesOf("Containers/Artist/AuctionResults", module).add(
  "Pablo Picasso",
  () => {
    return (
      <div>
        <ContextProvider>
          <StateProvider>
            <AuctionResultsContainer artistID="pablo-picasso" />
          </StateProvider>
        </ContextProvider>
      </div>
    )
  }
)
