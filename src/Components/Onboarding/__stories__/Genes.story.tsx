import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay/classic"

import { artsyNetworkLayer } from "../../../Relay/config"
import Genes from "../Steps/Genes"

storiesOf("Onboarding", module).add("Gene Follow", () => {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return <Genes onNextButtonPressed={null} />
})
