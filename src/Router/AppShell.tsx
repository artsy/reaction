import React, { SFC } from "react"
import serialize from "serialize-javascript"
import { ContextProvider } from "../Components/Artsy"
import { AppShellProps } from "./types"

export const AppShell: SFC<AppShellProps> = props => {
  const { loadableState, data = {}, children, provide } = props

  let hydrationData
  try {
    hydrationData = serialize(data, { isJSON: true })
  } catch (error) {
    hydrationData = "{}"
    console.error("reaction/Router/AppShell Error serializing data:", error)
  }

  return (
    <ContextProvider {...provide}>
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
    </ContextProvider>
  )
}
