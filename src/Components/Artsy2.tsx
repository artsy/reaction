import { ContextProps as _ContextProps } from "Components/Artsy"
import React, { SFC } from "react"
import { getUser } from "Utils/getUser"
import { createEnvironment } from "../Relay/createEnvironment"

// FIXME: Move from Artsy to Artsy2
export interface ContextProps extends _ContextProps {}

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
    _isNestedInProvider: true,
    currentUser,
    relayEnvironment,
  }

  return <Context.Provider value={providerValues}>{children}</Context.Provider>
}

// interface ArtsyConsumerProps {
//   children: (ContextProps) => JSX.Element
// }

export const ContextConsumer = Context.Consumer

// /**
//  * Creates a new Context.Consumer and validates that a Context.Provider has
//  * been created.
//  */
// export const ContextConsumer: SFC<ArtsyConsumerProps> = ({ children }) => {
//   return (
//     <Context.Consumer>
//       {contextValues => {
//         // FIXME: Find way to exclude _isNested from check
//         if (!(contextValues as any)._isNestedInProvider) {
//           throw new Error(
//             "Components/Artsy Error: Attempting to use ArtsyConsumer without " +
//               "an ArtsyProvider."
//           )
//         } else {
//           return children(contextValues)
//         }
//       }}
//     </Context.Consumer>
//   )
// }

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
