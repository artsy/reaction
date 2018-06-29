import { Container } from "unstated"
import UNSTATED from "unstated-debug"
import { GlobalStateContainerState, PreloadLinkContainerState } from "./types"

// Log state changes to the console
UNSTATED.logStateChanges = process.env.NODE_ENV === "development" ? true : false

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

export class GlobalState extends Container<GlobalStateContainerState> {
  state = {
    reactionRouter: null,
  }

  constructor(props: any = {}) {
    // FIXME
    super()
    this.state = {
      reactionRouter: props.reactionRouter,
    }
  }
  s
}

export class PreloadLinkState extends Container<PreloadLinkContainerState> {
  state = {
    isFetching: false,
  }

  toggleFetching = isFetching => {
    this.setState({
      isFetching,
    })
  }
}
