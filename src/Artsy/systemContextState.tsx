import { Breakpoint, breakpoints } from "@artsy/palette"
import { Router } from "found"

const initialState = {
  /**
   * Sets the max width of the app shell container. Defaults to breakpoints.xl
   */
  appMaxWidth: breakpoints.xl,

  /**
   * Toggle for setting global fetch state, typically set in RenderStatus
   */
  isFetching: false,

  /**
   * The current router instance
   */
  router: null,

  /**
   * The currently signed-in user.
   *
   * Unless explicitely set to `null`, this will default to use the `USER_ID`
   * and `USER_ACCESS_TOKEN` environment variables if available.
   */
  user: null,
}

export type State = Partial<typeof initialState>

export type Action =
  | { type: "setAppMaxWidth"; payload?: Breakpoint | "100%" }
  | { type: "setFetching"; payload: boolean }
  | { type: "setRouter"; payload: Router }
  | { type: "setUser"; payload: User }

export function systemContextReducer(prevState: State, action: Action): State {
  const getNewState = () => {
    switch (action.type) {
      case "setAppMaxWidth": {
        let appMaxWidth

        // Full-screen
        if (action.payload === "100%") {
          appMaxWidth = action.payload
          // Passing a specific breakpoint
        } else if (breakpoints[action.payload]) {
          appMaxWidth = breakpoints[action.payload]
          // Default breakpoint
        } else {
          appMaxWidth = breakpoints.xl
        }
        return {
          appMaxWidth,
        }
      }
      case "setFetching": {
        return {
          isFetching: action.payload,
        }
      }
      case "setRouter": {
        return {
          router: action.payload,
        }
      }
      case "setUser": {
        return {
          user: action.payload,
        }
      }
    }
  }

  const state = { ...prevState, ...getNewState() }
  return state
}
