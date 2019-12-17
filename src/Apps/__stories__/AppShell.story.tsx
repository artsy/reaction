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
        initialRoute="/collect"
        context={{
          // FIXME: Remove when a/b test is complete
          // @ts-ignore
          COLLECTION_HUBS: "experiment",
          mediator: {
            trigger: x => x,
          },
        }}
      />
    </SystemContextProvider>
  )
})
