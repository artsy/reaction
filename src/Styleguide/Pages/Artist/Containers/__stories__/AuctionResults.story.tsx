import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { AuctionResultsContainer } from "Styleguide/Pages/Artist/Containers/AuctionResults"

import { ContextProvider } from "Components/Artsy"
import { Provider as StateProvider } from "unstated"

storiesOf("Styleguide/Artist/AuctionResults", module).add(
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
