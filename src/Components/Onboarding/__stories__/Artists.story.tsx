import { storiesOf } from "@storybook/react"
import * as React from "react"
import { injectNetworkLayer } from "react-relay/classic"

import { artsyNetworkLayer } from "../../../Relay/config"
import Artists from "../Steps/Artists"

storiesOf("Onboarding", module).add("Artist Selector", () => {
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  injectNetworkLayer(artsyNetworkLayer(user))
  return <Artists onNextButtonPressed={null} />
})
