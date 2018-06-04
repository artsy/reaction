import React, { SFC } from "react"
import serialize from "serialize-javascript"
import { ContextProvider } from "../Components/Artsy"
import { AppShellProps } from "./types"

export const AppShell: SFC<AppShellProps> = props => {
  const { loadableState, data, children, provide } = props

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
              var __RELAY_BOOTSTRAP__ = ${serialize(
                JSON.stringify(data || {}),
                {
                  isJSON: true,
                }
              )};
            </script>
          `,
          }}
        />

        {children}
      </div>
    </ContextProvider>
  )
}
