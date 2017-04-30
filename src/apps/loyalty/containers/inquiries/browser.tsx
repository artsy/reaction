import IsomorphicRelay from "isomorphic-relay"
import * as React from "react"
import { render } from "react-dom"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../../../../relay/config"
import CurrentUserRoute from "../../../../relay/queries/current_user"
import Inquiries from "./index"

import * as sharify from "sharify"
import { ResponseLocalData } from "../../types"

const { CURRENT_USER, RELAY_DATA } = sharify.data as ResponseLocalData

const env = new (Relay as any).Environment()
const networkLayer = artsyNetworkLayer(CURRENT_USER)

env.injectDefaultNetworkLayer(networkLayer)
Relay.injectNetworkLayer(networkLayer)

IsomorphicRelay.injectPreparedData(env, RELAY_DATA)

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
