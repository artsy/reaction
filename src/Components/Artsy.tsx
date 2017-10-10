import * as PropTypes from "prop-types"
import * as React from "react"

/**
 * The Artsy specific props injected by the higher-order component produced by `ContextConsumer`.
 *
 * @see {@link ContextProvider}
 * @see {@link ContextConsumer}
 *
 * @todo Once this PR for `rest` https://github.com/Microsoft/TypeScript/pull/13470 lands we’ll be able to not make this
 *       optional and simply remove it from the props that a component wrapped with the `ContextConsumer` HOC accepts.
 */
export interface ContextProps {
  /**
   * The currently signed-in user.
   */
  currentUser?: User
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
}

/**
 * This component provides Artsy specific context props to components down the tree. Components that wish to consume
 * these props should be wrapped with the `ContextConsumer` higher-order component.
 *
 * @see {@link ContextConsumer}
 */
export class ContextProvider extends React.Component<ContextProps, null>
  implements React.ChildContextProvider<PrivateContextProps> {
  static childContextTypes = ContextTypes

  constructor(props) {
    if (React.Children.count(props.children) > 1) {
      throw new Error("A ContextProvider expects a single child.")
    }
    super(props)
  }

  getChildContext() {
    return {
      _isNestedInProvider: true,
      currentUser: this.props.currentUser,
    }
  }

  render() {
    return this.props.children as any
  }
}

/**
 * Wraps a component in a higher-order component that injects the Artsy specific context props into the given component.
 * Wrapped components are expected to be rendered in a tree that contains a `ContextProvider` component.
 *
 * The injected props are described in `ContextProps`.
 *
 * @see {@link ContextProvider}
 * @see {@link ContextProps}
 *
 * @param Component The component that needs Artsy specific context props.
 */
export function ContextConsumer<P>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.ComponentClass<P> {
  const name = Component.displayName || Component.name
  return class extends React.Component<P, void> {
    static contextTypes = ContextTypes
    static displayName = `Artsy(${name})`

    constructor(props, context: PrivateContextProps) {
      if (!context._isNestedInProvider) {
        const start = name || "A component"
        throw new Error(`${start}, which needs Artsy props, was not wrapped inside a ContextProvider component.`)
      }
      super(props, context)
    }

    render() {
      const currentUser = this.context.currentUser
      const props = Object.assign({ currentUser }, this.props)
      return <Component {...props} />
    }
  }
}
