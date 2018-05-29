import React, { SFC } from "react"
import serialize from "serialize-javascript"
import { ContextProvider } from "../Components/Artsy"

interface Props {
  loadableState?: any
  relayData?: any
  provide?: any
}

export const AppShell: SFC<Props> = props => {
  const { loadableState, relayData, children, provide } = props

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
                JSON.stringify(relayData || {}),
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
