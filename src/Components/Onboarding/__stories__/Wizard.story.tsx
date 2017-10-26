import { storiesOf } from "@storybook/react"
import * as React from "react"

import { ContextProvider } from "../../Artsy"
import Artists from "../Steps/Artists"
import CollectorIntent from "../Steps/CollectorIntent"
import Wizard from "../Wizard"

storiesOf("Onboarding", module).add("Wizard", () => {
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
