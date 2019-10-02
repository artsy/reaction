import { AppShell } from "Artsy/Router/AppShell"
import { SystemContextProvider } from "Artsy/SystemContext"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Apps", module).add("AppShell", () => {
  return (
    <SystemContextProvider>
      <AppShell>hi</AppShell>
    </SystemContextProvider>
  )
})
