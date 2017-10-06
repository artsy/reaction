import { storiesOf } from "@storybook/react"
import * as React from "react"

import { ContextProvider } from "../../artsy"
import Artists from "../steps/artists"
import CollectorIntent from "../steps/collector_intent"
import Wizard from "../wizard"

storiesOf("Onboarding").add("Wizard", () => {
  const currentUser = {
    accessToken: "blah",
    id: "my_id",
    name: "Joe",
  }
  return (
    <div>
      <ContextProvider currentUser={currentUser}>
        <Wizard stepComponents={[CollectorIntent, Artists]} />
      </ContextProvider>
    </div>
  )
})
