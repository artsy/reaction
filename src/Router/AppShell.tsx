import CircularJSON from "circular-json"
import React, { SFC } from "react"
import serialize from "serialize-javascript"
import { AppShellProps } from "./types"

export const AppShell: SFC<AppShellProps & { url?: string }> = props => {
  const { loadableState, data = {}, children } = props

  let hydrationData
  try {
    hydrationData = CircularJSON.stringify(data)
  } catch (error) {
    hydrationData = "{}"
    console.error("reaction/Router/AppShell Error serializing data:", error)
  }

  return (
    <div>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
            ${loadableState ? loadableState.getScriptTag() : ""}

            <script>
              var __RELAY_BOOTSTRAP__ = ${serialize(hydrationData, {
                isJSON: true,
              })};
            </script>
          `,
        }}
      />

      {children}
    </div>
  )
}
