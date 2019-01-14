import { Box } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { WorksForYou } from "Apps/WorksForYou"
import { ContextProvider } from "Artsy"
import React from "react"
import { MarketingHeader } from "../WorksForYou/MarketingHeader"

storiesOf("Apps/WorksForYou Page", module).add("Marketing Header", () => {
  return <MarketingHeader />
})

storiesOf("Apps/WorksForYou Page/Feed", module).add(
  "Including for sale works",
  () => {
    return (
      <Box p={6} pt={2}>
        <ContextProvider>
          <WorksForYou />
        </ContextProvider>
      </Box>
    )
  }
)

storiesOf("Apps/WorksForYou Page/Feed", module).add("All", () => {
  return (
    <Box p={6} pt={2}>
      <ContextProvider>
        <WorksForYou forSale={false} />
      </ContextProvider>
    </Box>
  )
})

storiesOf("Apps/WorksForYou Page/Selected Artist Feed", module).add(
  "Including for sale works",
  () => {
    return (
      <Box p={6} pt={2}>
        <ContextProvider>
          <WorksForYou artistID={"rosemarie-trockel"} />
        </ContextProvider>
      </Box>
    )
  }
)

storiesOf("Apps/WorksForYou Page/Selected Artist Feed", module).add(
  "All",
  () => {
    return (
      <Box p={6} pt={2}>
        <ContextProvider>
          <WorksForYou forSale={false} artistID={"pablo-picasso"} />
        </ContextProvider>
      </Box>
    )
  }
)
