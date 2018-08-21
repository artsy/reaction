import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents as WorksForYouContent } from "Styleguide/Components/WorksForYou"

import { ContextProvider } from "Components/Artsy"

storiesOf("Styleguide/Components/WorksForYou/Contents/Feed", module).add(
  "For Sale",
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

storiesOf("Styleguide/Components/WorksForYou/Contents/Feed", module).add(
  "All",
  () => {
    return (
      <div>
        <ContextProvider>
          <WorksForYouContent forSale={false} artistID={""} />
        </ContextProvider>
      </div>
    )
  }
)

storiesOf("Styleguide/Components/WorksForYou/Contents/Artist", module).add(
  "For Sale",
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

storiesOf("Styleguide/Components/WorksForYou/Contents/Artist", module).add(
  "All",
  () => {
    return (
      <div>
        <ContextProvider>
          <WorksForYouContent forSale={false} artistID={"pablo-picasso"} />
        </ContextProvider>
      </div>
    )
  }
)
