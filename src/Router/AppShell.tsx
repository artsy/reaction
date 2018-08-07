import React, { SFC } from "react"
import serialize from "serialize-javascript"
import { AppShellProps } from "./types"

export const AppShell: SFC<AppShellProps & { url?: string }> = props => {
  const { loadableState, children } = props

  // FIXME: Do we need this?
  let hydrationData: any = props.data || {}
  try {
    hydrationData = serialize(hydrationData, { isJSON: true })
  } catch (error) {
    hydrationData = "{}"
    console.error(
      "--- START ERROR -------------------------------------------------------"
    )
    console.error("URL:", props.url)
    console.table(props.data)
    console.error("reaction/Router/AppShell Error serializing data:", error)
    console.error(
      "--- END -------------------------------------------------------"
    )
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
