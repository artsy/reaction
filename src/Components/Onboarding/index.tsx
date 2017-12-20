import React from "react"

import Wizard from "./Wizard"

import Artists from "./Steps/Artists"
import CollectorIntent from "./Steps/CollectorIntent"

export default () => {
  return <Wizard stepComponents={[CollectorIntent, Artists]} />
}
