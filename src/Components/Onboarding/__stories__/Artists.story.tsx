import { storiesOf } from "@storybook/react"
import * as React from "react"

import { ContextProvider } from "../../Artsy"
import Artists from "../Steps/Artists"

storiesOf("Onboarding", module).add("Artist Selector", () => {
  const user = {
    id: "58ed621f9c18db55bc6b2dde",
    accessToken:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MTA2YjYxOWY1NjMzN2RiMzAwMDAxZjgiLCJzYWx0X2hhc2giOiI0ZmQzODA2NDFmN2M2MzVkOTVmMmQ5MTE3ZTNjYTM1MiIsInJvbGVzIjoidXNlcixhZG1pbixnZW5vbWVyLHNhbGVzX2FkbWluIiwicGFydG5lcl9pZHMiOltdLCJleHAiOjE1MTUxODU5NzEsImlhdCI6MTUxMDAwMTk3MSwiYXVkIjoiNGUzNmVmYTRkYjRlMzIwMDAxMDAwMzU5IiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVhMDBjZDMzOGIzYjgxNDAxOWU1ZTkzNSJ9.bl4fOO_YEaggPi35gxQ8qhryc4n-rtFGzTOtJ19Wf_U",
  } as User
  return (
    <ContextProvider currentUser={user}>
      <Artists onNextButtonPressed={null} />
    </ContextProvider>
  )
})
