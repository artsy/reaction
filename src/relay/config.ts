import * as Relay from "react-relay"
const sharify = require("sharify")

export function artsyNetworkLayer(user?: any) {
  return new Relay.DefaultNetworkLayer(sharify.data.METAPHYSICS_ENDPOINT, {
    headers: !!user ? {
      "X-USER-ID": user.id,
      "X-ACCESS-TOKEN": user.accessToken,
    } : {},
  })
}

/*
 * For the client.
 */
export function artsyRelayEnvironment() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
}
