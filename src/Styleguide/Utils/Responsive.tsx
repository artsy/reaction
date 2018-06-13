import React from "react"

const ResponsiveContext = React.createContext({})

const shallowEqual = (a, b) => {
  for (let key in a) {
    if (a[key] !== b[key]) return false
  }
  return true
}

export interface Breakpoints {
  [breakpoint: string]: string
}

export interface ResponsiveProviderProps {
  initialBreakpoint?: string
  breakpoints: Breakpoints
}

export interface BreakpointState {
  [breakpoint: string]: boolean
}

export interface ResponsiveProviderState {
  breakpoints: BreakpointState
  breakpointKeys: string[]
  mediaMatchers: MediaQueryList[]
}

export class ResponsiveProvider extends React.Component<
  ResponsiveProviderProps,
  ResponsiveProviderState
> {
  constructor(props) {
    super(props)
    const breakpointKeys = Object.keys(props.breakpoints)

    // Build initial breakpoint map --> { breakpoint1: false, breakpoint2: false, ...etc}
    let breakpoints = breakpointKeys
      .map(breakpoint => ({
        [breakpoint]: breakpoint === props.initialBreakpoint ? true : false,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})

    // Build up the MediaQueryList objects that observe mq changes
    const mediaMatchers = this.setupMatchers(props.breakpoints, breakpointKeys)

    // Perform initial breakpoint check so that first render is correct
    breakpoints = this.checkBreakpoints(
      breakpoints,
      breakpointKeys,
      mediaMatchers
    )

    this.state = {
      breakpoints,
      breakpointKeys,
      mediaMatchers,
    }
  }

  /**
   * Create an array of media matchers that can validate each breakpoint
   */
  setupMatchers = (breakpoints, breakpointKeys) => {
    return breakpointKeys.map(breakpoint =>
      window.matchMedia(breakpoints[breakpoint])
    )
  }

  /**
   * Uses the mediaMatchers list to build a map of the states of each breakpoint
   */
  checkBreakpoints = (breakpoints, breakpointKeys, mediaMatchers) => {
    let nextBreakpoints = breakpoints
    for (let i = 0; i < mediaMatchers.length; ++i) {
      nextBreakpoints = {
        ...nextBreakpoints,
        [breakpointKeys[i]]: mediaMatchers[i].matches,
      }
    }
    return nextBreakpoints
  }

  /**
   * The function that will be called any time a breakpoint changes
   */
  breakpointChangedCallback = () => {
    this.setState({
      breakpoints: this.checkBreakpoints(
        this.state.breakpoints,
        this.state.breakpointKeys,
        this.state.mediaMatchers
      ),
    })
  }

  /**
   * Creates the event listeners for each breakpoint
   */
  setupObservers = () => {
    const { breakpointChangedCallback } = this
    this.state.mediaMatchers.forEach(mediaQuery => {
      mediaQuery.addListener(breakpointChangedCallback)
    })
  }

  // Lifecycle methods

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.children !== this.props.children) return true
    if (shallowEqual(this.state.breakpoints, nextState.breakpoints)) {
      return false
    }
    return true
  }

  componentWillUnmount() {
    this.state.mediaMatchers.forEach(mediaQuery =>
      mediaQuery.removeListener(this.breakpointChangedCallback)
    )
  }

  componentDidMount() {
    this.setupObservers()
  }

  render() {
    return (
      <ResponsiveContext.Provider value={this.state.breakpoints}>
        {this.props.children}
      </ResponsiveContext.Provider>
    )
  }
}

export const Responsive: React.ComponentType<
  React.ConsumerProps<BreakpointState>
> =
  ResponsiveContext.Consumer
