import IsomorphicRelay from "isomorphic-relay"
import * as React from "react"
import { render } from "react-dom"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../../../../relay/config"
import CurrentUserRoute from "../../../../relay/queries/current_user"
import Inquiries from "./index"

declare var window: any

const env = new (Relay as any).Environment()
env.injectNetworkLayer(artsyNetworkLayer())

IsomorphicRelay.injectPreparedData(env, window.DATA)

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


