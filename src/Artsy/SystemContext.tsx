import React, { SFC, useContext, useState } from "react"
import { Environment } from "relay-runtime"

import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { Router } from "found"
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
   * Trigger for global fetching indicator
   */
  isFetching?: boolean

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
   * When in AppShell router context, store a reference to router instance
   */
  router?: Router

  searchQuery?: string

  /**
   * Toggle for setting global fetch state, typically set in the `RenderStatus.tsx`
   */
  setIsFetching?: (isFetching: boolean) => void
  setRouter?: (router: Router) => void

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
  const [isFetching, setIsFetching] = useState(false)
  const [router, setRouter] = useState(null)
  const user = getUser(props.user)
  const relayEnvironment =
    props.relayEnvironment || createRelaySSREnvironment({ user })

  const providerValues = {
    ...props,
    isFetching,
    setIsFetching,
    relayEnvironment,
    router,
    setRouter,
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
