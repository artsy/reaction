import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents } from "../Gene"

import { ContextProvider } from "../Artsy"

storiesOf("Components/Pages/Gene/Contents", module)
  .add("Artists Mode - Minimalism", () => {
    return (
      <div>
        < ContextProvider currentUser={{id: "58ed621f9c18db55bc6b2dde", name: "Matt", accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGVkNjIxZjljMThkYjU1YmM2YjJkZGUiLCJzYWx0X2hhc2giOiI2ZTVkMWVhYzJmMWQzNDhmZmZmOGJmMDAyOGQ1OTViOCIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoxNTE3NzYwMjA0LCJpYXQiOjE1MTI1NzYyMDQsImF1ZCI6IjRlMzZlZmE0ZGI0ZTMyMDAwMTAwMDM1OSIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1YTI4MTRjYzhiM2I4MTQ1ZjI2YTliNzUifQ.ksCRUaQRvGNRW2VnOSAAT32r9PM9s04axn7SqI-_Kno"}}>
          <Contents geneID="minimalism" mode="artists" onStateChange={console.log} />
        </ContextProvider>
      </div>
    )
  })

  .add("Artworks Mode - Animals", () => {
    return (
      <div>
        < ContextProvider currentUser={{id: "58ed621f9c18db55bc6b2dde", name: "Matt", accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGVkNjIxZjljMThkYjU1YmM2YjJkZGUiLCJzYWx0X2hhc2giOiI2ZTVkMWVhYzJmMWQzNDhmZmZmOGJmMDAyOGQ1OTViOCIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoxNTE3NzYwMjA0LCJpYXQiOjE1MTI1NzYyMDQsImF1ZCI6IjRlMzZlZmE0ZGI0ZTMyMDAwMTAwMDM1OSIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1YTI4MTRjYzhiM2I4MTQ1ZjI2YTliNzUifQ.ksCRUaQRvGNRW2VnOSAAT32r9PM9s04axn7SqI-_Kno"}}>
          <Contents geneID="animals" mode="artworks"  onStateChange={console.log} />
        </ContextProvider>
      </div>
    )
  })
