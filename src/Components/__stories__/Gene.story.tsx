import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents } from "../Gene"

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
  .add("Artworks Mode w/ Pagination Issue - Abstract Painting", () => {
    return (
      <div>
        <ContextProvider>
          <Contents
            filters={{ for_sale: false }}
            geneID="abstract-painting"
            mode="artworks"
            onStateChange={console.log}
          />
        </ContextProvider>
      </div>
    )
  })
