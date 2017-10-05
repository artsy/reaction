import { storiesOf } from "@storybook/react"
import * as React from "react"

import { ContextProvider } from "../../../../artsy"
import CollectorIntent from "../index"

storiesOf("Onboarding", module).add("Collector Intent", () => {
  const currentUser = {
    accessToken: "blah",
    id: "my_id",
    name: "Joe",
  }
  return (
    <ContextProvider currentUser={currentUser}>
      <CollectorIntent />
    </ContextProvider>
  )
})
