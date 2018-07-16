import React, { SFC } from "react"
import serialize from "serialize-javascript"

export interface AppShellProps {
  loadableState?: {
    getScriptTag: () => string
  }
  data?: Array<object>
}

export const AppShell: SFC<AppShellProps> = props => {
  const { loadableState, data = {}, children } = props

  let hydrationData
  try {
    hydrationData = serialize(data, { isJSON: true })
  } catch (error) {
    hydrationData = "{}"
    console.error("reaction/Router/AppShell Error serializing data:", error)
  }

  return (
    <div>
      <div
        // FIXME: type
        {...{ suppressHydrationWarning: true }}
        dangerouslySetInnerHTML={{
          __html: `
            ${loadableState ? loadableState.getScriptTag() : ""}

            <script>
              var __RELAY_BOOTSTRAP__ = ${serialize(hydrationData)};
            </script>
          `,
        }}
      />

      {children}
    </div>
  )
}
