import { SystemContextProvider } from "Artsy/SystemContext"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { AppShell } from "../AppShell/AppShell"

storiesOf("Framework", module).add("AppShell", () => {
  return (
    <SystemContextProvider>
      <AppShell />
    </SystemContextProvider>
  )
})
