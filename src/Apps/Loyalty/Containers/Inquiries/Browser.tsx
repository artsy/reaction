import IsomorphicRelay from "isomorphic-relay"
import * as React from "react"
import { render } from "react-dom"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../../../../relay/config"
import CurrentUserRoute from "../../../../relay/queries/current_user"
import Inquiries from "./index"

import * as sharify from "sharify"
import { LoginResponseLocalData } from "../../types"

import * as Artsy from "../../../../components/artsy"

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
