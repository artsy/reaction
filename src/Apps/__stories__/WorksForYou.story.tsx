import { storiesOf } from "@storybook/react"
import { WorksForYou } from "Apps/WorksForYou"
import { ContextProvider } from "Artsy"
import React from "react"
import { MarketingHeader } from "../WorksForYou/Components/MarketingHeader"

storiesOf("Apps/WorksForYou/Components", module).add("Marketing Header", () => {
  return <MarketingHeader />
})

storiesOf("Apps/WorksForYou/Feed", module).add("For Sale", () => {
  return (
    <ContextProvider>
      <WorksForYou />
    </ContextProvider>
  )
})

storiesOf("Apps/WorksForYou/Feed", module).add("All", () => {
  return (
    <ContextProvider>
      <WorksForYou forSale={false} />
    </ContextProvider>
  )
})

storiesOf("Apps/WorksForYou/Artist", module).add("For Sale", () => {
  return (
    <ContextProvider>
      <WorksForYou artistID={"rosemarie-trockel"} />
    </ContextProvider>
  )
})

storiesOf("Apps/WorksForYou/Artist", module).add("All", () => {
  return (
    <ContextProvider>
      <WorksForYou forSale={false} artistID={"pablo-picasso"} />
    </ContextProvider>
  )
})
