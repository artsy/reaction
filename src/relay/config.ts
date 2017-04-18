import * as Relay from "react-relay"

export function artsyNetworkLayer(user?: any) {
  return new Relay.DefaultNetworkLayer(process.env.METAPHYSICS_ENDPOINT, {
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
