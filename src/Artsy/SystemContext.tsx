import React, { SFC, useContext, useMemo, useState } from "react"
import { Environment } from "relay-runtime"

import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { getUser } from "Utils/user"

export interface Mediator {
  trigger: (action: string, config?: object) => void
}

/**
 * Globally accessible SystemContext values for use in Artsy apps
 */
export interface SystemContextProps {
  /** Is the user opening a Reaction page from the mobile app */
  isEigen?: boolean

  /**
   * When a request is being performed by the router this value is updated
   */
  isRouterFetching?: boolean

  /**
   * A PubSub hub, which should only be used for communicating with Force.
   */
  mediator?: Mediator

  /**
   * FIXME: Ask alloy how to pass one-off props like this in from force
   */
  notificationCount?: number
  searchQuery?: string

  /**
   * A configured environment object that can be used for any Relay operations
   * that need an environment object.
   *
   * If none is provided to the `SystemContextProvider` then one is created,
   * using the `user` if available.
   */
  relayEnvironment?: Environment

  /**
   * Toggles `isRouterFetching`, which UI can tap into for displaying custom
   * loading states.
   */
  setRouterFetching?: (isFetching: boolean) => void

  /**
   * The currently signed-in user.
   *
   * Unless explicitely set to `null`, this will default to use the `USER_ID`
   * and `USER_ACCESS_TOKEN` environment variables if available.
   */
  user?: User
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
  const [isRouterFetching, setRouterFetching] = useState(false)
  const user = getUser(props.user)

  const relayEnvironment =
    props.relayEnvironment || createRelaySSREnvironment({ user })

  console.log(isRouterFetching, "-------------------")
  const providerValues = useMemo(() => {
    return {
      ...props,
      isRouterFetching,
      relayEnvironment,
      setRouterFetching,
      user,
    }
  }, [props.relayEnvironment, props.user])

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
