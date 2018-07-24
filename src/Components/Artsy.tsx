import PropTypes from "prop-types"
import React from "react"
import { Environment } from "relay-runtime"
import { createEnvironment } from "../Relay/createEnvironment"

// TODO: Once this PR for `rest` https://github.com/Microsoft/TypeScript/pull/13470 lands
// we’ll be able to not make this optional and simply remove it from the props that a
// component wrapped with the `ContextConsumer` HOC accepts.

/**
 * The Artsy specific props injected by the higher-order component produced
 * by `ContextConsumer`.
 *
 * @see {@link ContextProvider}
 * @see {@link ContextConsumer}
 *
 */
export interface ContextProps {
  /**
   * The currently signed-in user.
   *
   * Unless explicitely set to `null`, this will default to use the `USER_ID`
   * and `USER_ACCESS_TOKEN` environment variables if available.
   */
  currentUser?: User | null

  /**
   * A configured environment object that can be used for any Relay operations
   * that need an environment object.
   *
   * If none is provided to the `ContextProvider` then one is created, using
   * the `currentUser` if available.
   */
  relayEnvironment?: Environment
}

interface PrivateContextProps extends ContextProps {
  /**
   * This prop solely exists to verify that a consumer is nested inside a provider.
   */
  _isNestedInProvider: boolean
}

const ContextTypes: React.ValidationMap<PrivateContextProps> = {
  _isNestedInProvider: PropTypes.bool,
  currentUser: PropTypes.object,
  relayEnvironment: PropTypes.object,
}

/**
 * This component provides Artsy specific context props to components down the
 * tree. Components that wish to consume these props should be wrapped with the
 * `ContextConsumer` higher-order component.
 *
 * @see {@link ContextConsumer}
 */
export class ContextProvider extends React.Component<ContextProps>
  implements React.ChildContextProvider<PrivateContextProps> {
  static childContextTypes = ContextTypes

  private currentUser: User | null
  private relayEnvironment: Environment

  constructor(props: ContextProps & { children?: React.ReactNode }) {
    if (React.Children.count(props.children) > 1) {
      throw new Error("A ContextProvider expects a single child.")
    }
    super(props)

    if (props.currentUser) {
      this.currentUser = props.currentUser
    } else if (props.currentUser === undefined) {
      const id = process.env.USER_ID
      const accessToken = process.env.USER_ACCESS_TOKEN
      if (id && accessToken) {
        this.currentUser = { id, accessToken }
      }
    }

    this.relayEnvironment =
      props.relayEnvironment || createEnvironment({ user: this.currentUser })
  }

  getChildContext() {
    return {
      _isNestedInProvider: true,
      currentUser: this.currentUser,
      relayEnvironment: this.relayEnvironment,
    }
  }

  render() {
    return this.props.children as any
  }
}

/**
 * Wraps a component in a higher-order component that injects the Artsy
 * specific context props into the given component. Wrapped components are
 * expected to be rendered in a tree that contains a `ContextProvider` component.
 *
 * The injected props are described in `ContextProps`.
 *
 * @see {@link ContextProvider}
 * @see {@link ContextProps}
 *
 * @param Component The component that needs Artsy specific context props.
 */
export function ContextConsumer<P>(
  Component:
    | React.ComponentClass<P & ContextProps>
    | React.StatelessComponent<P & ContextProps>
): React.ComponentClass<P> {
  const name = Component.displayName || Component.name
  return class extends React.Component<P, null> {
    static contextTypes = ContextTypes
    static displayName = `Artsy(${name})`

    constructor(props: P, context: PrivateContextProps) {
      if (!context._isNestedInProvider) {
        const start = name || "A component"
        throw new Error(
          `${start}, which needs Artsy props, was not wrapped inside a ContextProvider component.`
        )
      }
      super(props, context)
    }

    render() {
      const { currentUser, relayEnvironment } = this.context

      const props = Object.assign({ currentUser, relayEnvironment }, this.props)

      return <Component {...props} />
    }
  }
}
