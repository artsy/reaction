import { storiesOf } from "@storybook/react"
import * as React from "react"

import { ContextProvider } from "../../Artsy"
import Artists from "../Steps/Artists"

storiesOf("Onboarding", module).add("Artist Selector", () => {
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  return (
    <ContextProvider currentUser={user}>
      <Artists onNextButtonPressed={null} />
    </ContextProvider>
  )
})
