import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "../../Artsy"
import Artists from "../Steps/Artists"
import CollectorIntent from "../Steps/CollectorIntent"
import Wizard from "../Wizard"

storiesOf("Onboarding", module).add("Wizard", () => {
  return (
    <div>
      <ContextProvider>
        <Wizard stepComponents={[CollectorIntent, Artists]} />
      </ContextProvider>
    </div>
  )
})
