import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay/classic"

import { artsyNetworkLayer } from "../../../Relay/config"
import Artists from "../Steps/Artists"

storiesOf("Onboarding", module).add("Artist Selector", () => {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return <Artists onNextButtonPressed={null} />
})
