import React, { SFC } from "react"
import { AppShellProps } from "Router/types"
import serialize from "serialize-javascript"

export const Hydrator: SFC<AppShellProps> = props => {
  const { loadableState, data = {}, children } = props

  let hydrationData
  try {
    hydrationData = serialize(data, {
      isJSON: true,
    })
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
