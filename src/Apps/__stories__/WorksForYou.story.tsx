import { storiesOf } from "@storybook/react"
import { Contents as WorksForYouContent } from "Apps/WorksForYou"
import React from "react"

import { ContextProvider } from "Components/Artsy"

storiesOf("Apps/WorksForYou/Feed", module).add("For Sale", () => {
  return (
    <div>
      <ContextProvider>
        <WorksForYouContent artistID={""} />
      </ContextProvider>
    </div>
  )
})

storiesOf("Apps/WorksForYou/Feed", module).add("All", () => {
  return (
    <div>
      <ContextProvider>
        <WorksForYouContent forSale={false} artistID={""} />
      </ContextProvider>
    </div>
  )
})

storiesOf("Apps/WorksForYou/Artist", module).add("For Sale", () => {
  return (
    <div>
      <ContextProvider>
        <WorksForYouContent artistID={"pablo-picasso"} />
      </ContextProvider>
    </div>
  )
})

storiesOf("Apps/WorksForYou/Artist", module).add("All", () => {
  return (
    <div>
      <ContextProvider>
        <WorksForYouContent forSale={false} artistID={"pablo-picasso"} />
      </ContextProvider>
    </div>
  )
})
