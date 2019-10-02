import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "Artsy/SystemContext"
import { MockRouter } from "DevTools"

import { appRoutes } from "Apps/appRoutes"

storiesOf("Apps", module).add("AppShell", () => {
  return (
    <SystemContextProvider>
      <MockRouter routes={appRoutes} initialRoute="/collect" />
    </SystemContextProvider>
  )
})
