import { storiesOf } from "@storybook/react"
import * as React from 'react'

import CollectorIntent from "../index"

storiesOf("Onboarding", module).add("Collector Intent", () => {
  return (
    <CollectorIntent />
  )
})
