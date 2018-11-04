import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents } from "../Gene"

import { SystemContextProvider } from "Artsy/SystemContext"

storiesOf("Components/Pages/Gene/Contents", module)
  .add("Artists Mode - Minimalism", () => {
    return (
      <div>
        <SystemContextProvider>
          <Contents
            filters={{}}
            geneID="minimalism"
            mode="artists"
            onStateChange={console.log}
          />
        </SystemContextProvider>
      </div>
    )
  })
  .add("Artworks Mode - Animals", () => {
    return (
      <div>
        <SystemContextProvider>
          <Contents
            sort="-year"
            filters={{ for_sale: true }}
            geneID="animals"
            mode="artworks"
            onStateChange={console.log}
          />
        </SystemContextProvider>
      </div>
    )
  })
  .add("Artworks Mode w/ Pagination Issue - Russia", () => {
    return (
      <div>
        <SystemContextProvider>
          <Contents
            sort="-year"
            filters={{ for_sale: true }}
            geneID="russia"
            mode="artworks"
            onStateChange={console.log}
          />
        </SystemContextProvider>
      </div>
    )
  })
