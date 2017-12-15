import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents } from "../Tag"

import { ContextProvider } from "../Artsy"

storiesOf("Components/Pages/Tag/Contents", module)
  .add("Butt", () => {
    return (
      <div>
        <ContextProvider>
          <Contents tagID="butt" onStateChange={console.log} />
        </ContextProvider>
      </div>
    )
  })
