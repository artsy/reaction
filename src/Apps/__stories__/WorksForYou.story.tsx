import { Box } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { WorksForYou } from "Apps/WorksForYou"
import { SystemContextProvider } from "Artsy"
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
        <SystemContextProvider>
          <WorksForYou />
        </SystemContextProvider>
      </Box>
    )
  }
)

storiesOf("Apps/WorksForYou Page/Feed", module).add("All", () => {
  return (
    <Box p={6} pt={2}>
      <SystemContextProvider>
        <WorksForYou forSale={false} />
      </SystemContextProvider>
    </Box>
  )
})

storiesOf("Apps/WorksForYou Page/Selected Artist Feed", module).add(
  "Including for sale works",
  () => {
    return (
      <Box p={6} pt={2}>
        <SystemContextProvider>
          <WorksForYou artistID={"rosemarie-trockel"} />
        </SystemContextProvider>
      </Box>
    )
  }
)

storiesOf("Apps/WorksForYou Page/Selected Artist Feed", module).add(
  "All",
  () => {
    return (
      <Box p={6} pt={2}>
        <SystemContextProvider>
          <WorksForYou forSale={false} artistID={"pablo-picasso"} />
        </SystemContextProvider>
      </Box>
    )
  }
)
