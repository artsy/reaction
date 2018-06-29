import { Container } from "unstated"
import { GlobalStateContainer, PreloadLinkContainer } from "./types"

const enableLogging =
  process.env.NODE_ENV === "development" && typeof window !== "undefined"

if (enableLogging) {
  const logger = require("unstated-debug")
  logger.logStateChanges = false
}

/**
 * The following are state containers to be used with unstated. If needing to
 * tap into state can use like so:
 *
 * @example
 * import { GlobalAppState } from 'Router/State'
 *
 * return(
 *   <Subscribe to={[GlobalAppState]}>
 *     {({ state }: GlobalAppState) => {
 *       return (
 *         <div>
 *           Logged in? {state.isLoggedIn}
 *         </div>
 *       )
 *     }}
 *   </Subscribe>
 * )
 */

export class GlobalState extends Container<GlobalStateContainer> {
  state = {
    system: null,
  }

  constructor(props: any = {}) {
    super()
    this.state = props
  }
  s
}

export class PreloadLinkState extends Container<PreloadLinkContainer> {
  state = {
    isFetching: false,
  }

  toggleFetching = isFetching => {
    this.setState({
      isFetching,
    })
  }
}
