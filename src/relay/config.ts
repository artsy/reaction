import * as Relay from "react-relay"

export const metaphysicsURL = "https://metaphysics-staging.artsy.net"

export function artsyNetworkLayer() {
  return new Relay.DefaultNetworkLayer(metaphysicsURL, {
    headers: {
      // 'X-USER-ID': Emission.userID,
      // 'X-ACCESS-TOKEN': Emission.authenticationToken,
    },
  })
}



/*
 * For the client.
 */
export function artsyRelayEnvironment() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
}
