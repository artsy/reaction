import { storiesOf } from "@storybook/react"
import React from "react"
import { Contents as WorksForYouContent } from "Styleguide/Components/WorksForYou"

import { ContextProvider } from "Components/Artsy"

storiesOf("Components/WorksForYou/Contents", module).add("WorksForYou", () => {
  return (
    <div>
      <ContextProvider>
        <WorksForYouContent />
      </ContextProvider>
    </div>
  )
})
