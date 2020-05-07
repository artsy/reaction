import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "Artsy/SystemContext"
import { MockRouter } from "DevTools"

import { getAppRoutes } from "Apps/getAppRoutes"

storiesOf("Apps", module).add("AppShell", () => {
  return (
    <SystemContextProvider>
      <MockRouter
        routes={getAppRoutes()}
        initialRoute="/viewing-room"
        context={{
          mediator: {
            trigger: x => x,
            on: x => x,
            off: x => x,
          },
        }}
      />
    </SystemContextProvider>
  )
})
