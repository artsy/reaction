import { RelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { SystemContextProps } from "../SystemContext"

export { Link } from "found"
export { Boot } from "./Boot"
export { SystemContextProvider, SystemContextConsumer } from "Artsy"
import { RouterConfig as ArcRouterConfig } from "@artsy/arc"

/**
 * Configuration used when creating a new Router app
 */
export interface RouterConfig extends ArcRouterConfig {
  /**
   * Context values to be passed to ArtsyContext
   */
  context?: SystemContextProps & { relayEnvironment?: RelaySSREnvironment }
}
