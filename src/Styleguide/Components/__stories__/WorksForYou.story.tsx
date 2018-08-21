import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents as WorksForYouContent } from "Styleguide/Components/WorksForYou"

import { ContextProvider } from "Components/Artsy"

storiesOf("Styleguide/Components/WorksForYou/Contents", module).add(
  "WorksForYou - Root",
  () => {
    return (
      <div>
        <ContextProvider>
          <WorksForYouContent artistID={""} />
        </ContextProvider>
      </div>
    )
  }
)

storiesOf("Styleguide/Components/WorksForYou/Contents", module).add(
  "WorksForYou - ArtistMode",
  () => {
    return (
      <div>
        <ContextProvider>
          <WorksForYouContent artistID={"pablo-picasso"} />
        </ContextProvider>
      </div>
    )
  }
)
