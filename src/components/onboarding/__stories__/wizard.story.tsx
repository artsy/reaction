import { storiesOf } from "@storybook/react"
import * as React from "react"

import Artists from "../steps/artists"
import CollectorIntent from "../steps/collector_intent"
import Wizard from "../wizard"

storiesOf("Onboarding", module).add("Wizard", () => {
  return (
    <div>
      <Wizard stepComponents={[CollectorIntent, Artists]} />
    </div>
  )
})
