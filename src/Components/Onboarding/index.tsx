import * as React from "react"

import Wizard from "./wizard"

import Artists from "./steps/artists"
import CollectorIntent from "./steps/collector_intent"

export default () => {
  return <Wizard stepComponents={[CollectorIntent, Artists]} />
}
