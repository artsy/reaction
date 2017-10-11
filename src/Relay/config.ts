import * as Relay from "react-relay/classic"
import * as sharify from "sharify"

export function artsyNetworkLayer(user?: User) {
  return new Relay.DefaultNetworkLayer(sharify.data.METAPHYSICS_ENDPOINT, {
    headers: !!user
      ? {
          "X-USER-ID": user.id,
          "X-ACCESS-TOKEN": user.accessToken,
        }
      : {},
  })
}

/*
 * For the client.
 */
export function artsyRelayEnvironment() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
}
