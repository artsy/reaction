import { createEnvironment } from "Artsy/Relay/createEnvironment"
import { ContextProps as _ContextProps } from "Components/Artsy"
import React, { SFC } from "react"
import { RelayNetwork } from "relay-runtime"
import { getUser } from "Utils/getUser"
import { MatchingMediaQueries } from "Utils/Responsive"

/**
 * Globally accessible Context values for use in Artsy apps
 */
export interface ContextProps {
  /**
   * The currently signed-in user.
   *
   * Unless explicitely set to `null`, this will default to use the `USER_ID`
   * and `USER_ACCESS_TOKEN` environment variables if available.
   */
  currentUser?: User

  /**
   * Media queries that are passed to Responsive when an app first mounts. Useful
   * for SSR rendering views for mobile devices.
   */
  initialMatchingMediaQueries?: MatchingMediaQueries

  /**
   * A PubSub hub typically used for communicating with Force.
   */
  mediator?: {
    trigger: (action: string, config?: object) => void
  }

  /**
   * A configured environment object that can be used for any Relay operations
   * that need an environment object.
   *
   * If none is provided to the `ContextProvider` then one is created, using
   * the `currentUser` if available.
   */
  relayNetwork?: RelayNetwork

  /**
   * Catch-all for additional context values passed in during initialization.
   */
  [key: string]: any
}

const Context = React.createContext<ContextProps>({})

/**
 * Creates a new Context.Provider with a user and Relay environment, or defaults
 * if not passed in as props.
 */
export const ContextProvider: SFC<ContextProps> = ({ children, ...props }) => {
  const currentUser = getUser(props.currentUser)
  const relayEnvironment =
    props.relayEnvironment || createEnvironment({ user: currentUser })

  const providerValues = {
    ...props,
    currentUser,
    relayEnvironment,
  }

  return <Context.Provider value={providerValues}>{children}</Context.Provider>
}

export const ContextConsumer = Context.Consumer

/**
 * A HOC utility function for injecting renderProps into a component.
 */
export const withContext = Component => {
  return props => {
    return (
      <ContextConsumer>
        {contextValues => {
          return <Component {...contextValues} {...props} />
        }}
      </ContextConsumer>
    )
  }
}
