import { storiesOf } from "@storybook/react"
import * as React from "react"

import { ContextProvider } from "../../Artsy"
import Genes from "../Steps/Genes"

storiesOf("Onboarding", module).add("Gene Follow", () => {
  const user = {
    name: "user name",
    id: "some-id",
    accessToken: "some-token",
  }
  return (
    <ContextProvider currentUser={user}>
      <Genes onNextButtonPressed={null} />
    </ContextProvider>
  )
})
