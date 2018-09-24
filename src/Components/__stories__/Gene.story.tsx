import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents } from "../Gene"
import { PaymentFormWrapper } from "../Payment/PaymentFormWrapper"
import { SavedCreditCards } from "../Payment/SavedCreditCards"

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
  .add("sarah test", () => {
    return (
      <div>
        <ContextProvider>
          <PaymentFormWrapper />
        </ContextProvider>
      </div>
    )
  })
  .add("sarah test2", () => {
    const creditCards = [
      {
        brand: "Visa",
        last_digits: "1234",
        expiration_month: "02",
        expiration_year: "2022",
      },
      {
        brand: "Mastercard",
        last_digits: "2345",
        expiration_month: "04",
        expiration_year: "2023",
      },
    ]
    return (
      <div>
        <ContextProvider>
          <SavedCreditCards creditCards={creditCards} />
        </ContextProvider>
      </div>
    )
  })
