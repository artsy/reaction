import React, { Dispatch, SFC, useContext, useReducer } from "react"
import { Environment } from "relay-runtime"

import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { getUser } from "Utils/user"
import {
  Action as SystemContextAction,
  State as SystemContextState,
  systemContextReducer,
} from "./systemContextState"

export interface Mediator {
  trigger: (action: string, config?: object) => void
  on?: (event: string, cb?: (payload?: object) => void) => void
  off?: (event: string) => void
}

/**
 * Globally accessible SystemContext values for use in Artsy apps
 */
export interface SystemContextProps extends SystemContextState {
  dispatch?: Dispatch<SystemContextAction>
  /**
   * Is the user opening a Reaction page from the mobile app
   */
  isEigen?: boolean

  /**
   * A PubSub hub, which should only be used for communicating with Force.
   */
  mediator?: Mediator

  /**
   * FIXME: Ask alloy how to pass one-off props like this in from force
   */
  notificationCount?: number

  /**
   * A configured environment object that can be used for any Relay operations
   * that need an environment object.
   *
   * If none is provided to the `SystemContextProvider` then one is created,
   * using the `user` if available.
   */
  relayEnvironment?: Environment

  /**
   * The current search query.
   * FIXME: Move this to a more appropriate place
   */
  searchQuery?: string

  /**
   * Useful for passing arbitrary data from Force.
   */
  injectedData?: any

  // TODO: Remove once A/B test completes
  EXPERIMENTAL_APP_SHELL?: boolean
}

export const SystemContext = React.createContext<SystemContextProps>({})

/**
 * Creates a new Context.Provider with a user and Relay environment, or defaults
 * if not passed in as props.
 */
export const SystemContextProvider: SFC<SystemContextProps> = ({
  children,
  ...props
}) => {
  const [state, dispatch] = useReducer(systemContextReducer, {
    isFetching: false,
    router: null,
    user: getUser(props.user),
  })

  const { user } = state
  const relayEnvironment =
    props.relayEnvironment || createRelaySSREnvironment({ user })
  const providerValues = {
    ...props,
    ...state,
    dispatch,
    relayEnvironment,
    user,
  }

  return (
    <SystemContext.Provider value={providerValues}>
      {children}
    </SystemContext.Provider>
  )
}

export const SystemContextConsumer = SystemContext.Consumer

/**
 * A HOC utility function for injecting renderProps into a component.
 */
export const withSystemContext = Component => {
  return props => {
    return (
      <SystemContextConsumer>
        {contextValues => {
          return <Component {...contextValues} {...props} />
        }}
      </SystemContextConsumer>
    )
  }
}

/**
 * Custom hook to access SystemContext
 */
export const useSystemContext = () => {
  const systemContext = useContext(SystemContext)
  return systemContext
}
