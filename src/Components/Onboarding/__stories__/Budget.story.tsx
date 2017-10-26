import { storiesOf } from "@storybook/react"
import * as React from "react"

import { ContextProvider } from "../../Artsy"
import Budget from "../Steps/Budget"

storiesOf("Onboarding", module).add("Budget", () => {
  const currentUser = {
    accessToken: "blah",
    id: "my_id",
    name: "Joe",
  }
  return (
    <div>
      <ContextProvider currentUser={currentUser}>
        {/* tbc */}
        <Budget onNextButtonPressed={null} />
      </ContextProvider>
    </div>
  )
})
