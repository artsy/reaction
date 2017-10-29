import IsomorphicRelay from "isomorphic-relay"
import React from "react"
import { render } from "react-dom"
import Relay from "react-relay"

import { artsyNetworkLayer } from "../../../../Relay/config"
import CurrentUserRoute from "../../../../Relay/Queries/CurrentUser"
import Inquiries from "./index"

import * as sharify from "sharify"
import { LoginResponseLocalData } from "../../Types"

import * as Artsy from "../../../../Components/Artsy"

const { CURRENT_USER, RELAY_DATA } = sharify.data as LoginResponseLocalData

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
  render(
    <Artsy.ContextProvider currentUser={CURRENT_USER}>
      <IsomorphicRelay.Renderer {...props} />
    </Artsy.ContextProvider>,
    document.getElementById("app-container")
  )
})
