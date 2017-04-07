import * as Relay from "react-relay"

export const metaphysicsURL = "https://metaphysics-staging.artsy.net"

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
