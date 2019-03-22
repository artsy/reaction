import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import React, { SFC, useState } from "react"
import { Environment } from "relay-runtime"
import { getUser } from "Utils/getUser"

export interface Mediator {
  trigger: (action: string, config?: object) => void
}

export interface SystemProps {
  /** Flag for checking if we're within an Eigen webview */
  isEigen?: boolean

  /** Flag for when the Relay network layer is performing a request */
  isFetchingData?: boolean

  /** A PubSub hub typically used for communicating with Force. */
  mediator?: Mediator

  /**
   * A configured environment object that can be used for any Relay operations
   * that need an environment object.
   *
   * If none is provided to the `ContextProvider` then one is created, using
   * the `user` if available.
   */
  relayEnvironment?: Environment & { toggleFetching?: (isFetching) => void }

  /**
   * The currently signed-in user.
   *
   * Unless explicitely set to `null`, this will default to use the `USER_ID`
   * and `USER_ACCESS_TOKEN` environment variables if available.
   */
  user?: User
}

/**
 * Globally accessible Context values for use in Artsy apps
 */
export interface ContextProps<T = {}> extends SystemProps {
  /**
   * Catch-all for additional context values passed in during initialization.
   */
  [key: string]: any
}

export const SystemContext = React.createContext<ContextProps<any>>({})

/**
 * Creates a new Context.Provider with a user and Relay environment, or defaults
 * if not passed in as props.
 */
export const ContextProvider: SFC<ContextProps<any>> = ({
  children,
  ...props
}) => {
  const _user = getUser(props.user)
  const relayEnvironment =
    props.relayEnvironment || createRelaySSREnvironment({ user: _user })

  // Listen for changes to relay data fetching state and update consumers
  const [isFetchingData, toggleFetching] = useState(false)

  const providerValues = {
    ...props,
    user: _user,
    relayEnvironment,
    isFetchingData,
  }

  // Attach a loading state toggle to the relay environment which is triggered
  // from within the middleware when fetches begin / complete.
  relayEnvironment.toggleFetching = toggleFetching

  return (
    <SystemContext.Provider value={providerValues}>
      {children}
    </SystemContext.Provider>
  )
}

export const ContextConsumer = SystemContext.Consumer

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
