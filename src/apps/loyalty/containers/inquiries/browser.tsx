import IsomorphicRelay from "isomorphic-relay"
import * as React from "react"
import { render } from "react-dom"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../../../../relay/config"
import CurrentUserRoute from "../../../../relay/queries/current_user"
import Inquiries from "./index"

import * as sharify from "sharify"
const { CURRENT_USER } = sharify.data

const env = new (Relay as any).Environment()
const networkLayer = artsyNetworkLayer(sharify.data.CURRENT_USER)

env.injectDefaultNetworkLayer(networkLayer)
Relay.injectNetworkLayer(networkLayer)

IsomorphicRelay.injectPreparedData(env, sharify.data.RELAY_DATA)

IsomorphicRelay.prepareInitialRender({
  Container: Inquiries,
  queryConfig: new CurrentUserRoute(),
  environment: env,
}).then(props => {
  render((
      <IsomorphicRelay.Renderer {...props} />
    ),
    document.getElementById("app-container"),
  )
})
