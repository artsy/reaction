import IsomorphicRelay from "isomorphic-relay"
import * as React from "react"
import { render } from "react-dom"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../../../../relay/config"
import CurrentUserRoute from "../../../../relay/queries/current_user"
import Inquiries from "./index"

Relay.injectNetworkLayer(artsyNetworkLayer())

render((
    <Relay.RootContainer
      Component={Inquiries}
      route={new CurrentUserRoute()}
    />
  ),
  document.getElementById("app-container"),
)

