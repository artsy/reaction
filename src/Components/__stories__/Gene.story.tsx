import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents } from "../Gene"
import { PaymentFormWrapper } from "../Payment/PaymentFormWrapper"
import { UserSettingsPayments } from "../Payment/UserSettingsPayments"

import { ContextProvider } from "Artsy/SystemContext"

storiesOf("Components/Pages/Gene/Contents", module)
  .add("Artists Mode - Minimalism", () => {
    return (
      <div>
        <ContextProvider>
          <Contents
            filters={{}}
            geneID="minimalism"
            mode="artists"
            onStateChange={console.log}
          />
        </ContextProvider>
      </div>
    )
  })
  .add("Artworks Mode - Animals", () => {
    return (
      <div>
        <ContextProvider>
          <Contents
            sort="-year"
            filters={{ for_sale: true }}
            geneID="animals"
            mode="artworks"
            onStateChange={console.log}
          />
        </ContextProvider>
      </div>
    )
  })
  .add("Artworks Mode w/ Pagination Issue - Russia", () => {
    return (
      <div>
        <ContextProvider>
          <Contents
            sort="-year"
            filters={{ for_sale: true }}
            geneID="russia"
            mode="artworks"
            onStateChange={console.log}
          />
        </ContextProvider>
      </div>
    )
  })
