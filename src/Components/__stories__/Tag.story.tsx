import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents } from "../Tag"

import { ContextProvider } from "../Artsy"

storiesOf("Components/Pages/Tag/Contents", module)
  .add("Butt", () => {
    return (
      <div>
        < ContextProvider currentUser={{id: "58ed621f9c18db55bc6b2dde", accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGVkNjIxZjljMThkYjU1YmM2YjJkZGUiLCJzYWx0X2hhc2giOiI2ZTVkMWVhYzJmMWQzNDhmZmZmOGJmMDAyOGQ1OTViOCIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoxNTE3NzYwMjA0LCJpYXQiOjE1MTI1NzYyMDQsImF1ZCI6IjRlMzZlZmE0ZGI0ZTMyMDAwMTAwMDM1OSIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1YTI4MTRjYzhiM2I4MTQ1ZjI2YTliNzUifQ.ksCRUaQRvGNRW2VnOSAAT32r9PM9s04axn7SqI-_Kno"}}>
          <Contents tagID="butt" onStateChange={console.log} />
        </ContextProvider>
      </div>
    )
  })
