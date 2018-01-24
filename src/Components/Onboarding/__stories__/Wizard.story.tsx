import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "../../Artsy"
import Artists from "../Steps/Artists"
import Budget from "../Steps/Budget"
import CollectorIntent from "../Steps/CollectorIntent"
import Genes from "../Steps/Genes"
import Wizard from "../Wizard"

storiesOf("Onboarding", module).add("Wizard", () => {
  return (
    <div>
      <ContextProvider>
        <Wizard
          stepComponents={[CollectorIntent, Artists, Genes, Budget]}
          redirectTo={"/"}
        />
      </ContextProvider>
    </div>
  )
})
