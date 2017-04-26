import * as Relay from "react-relay"
const sharify = require("sharify")

export const metaphysicsURL = "https://metaphysics-production.artsy.net"

export function artsyNetworkLayer(user?: any) {
  return new Relay.DefaultNetworkLayer(metaphysicsURL, {
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
