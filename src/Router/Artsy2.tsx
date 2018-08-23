import { ContextProps as _ContextProps } from "Components/Artsy"
import React, { SFC } from "react"
import { getUser } from "Utils/getUser"
import { createEnvironment } from "../Relay/createEnvironment"

// FIXME: Move from Artsy to Artsy2
export interface ContextProps extends _ContextProps {
  // FIXME: Type properly
  mediator?: any
  system?: any
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
