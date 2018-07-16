import React from "react"

const ResponsiveContext = React.createContext({})

const shallowEqual = (a, b) => {
  for (let key in a) {
    if (a[key] !== b[key]) return false
  }
  return true
}

// TODO: Make this generic on the consumer component when we OSS this separately
//       and keep this module from where we’ll export our own `Responsive`
//       wrapper that has these Artsy specific breakpoint typings.
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl"
type Breakpoints<T> = { [K in Breakpoint]: T }

type BreakpointKeys = Breakpoint[]
type BreakpointsProp = Breakpoints<string>
type BreakpointState = Breakpoints<boolean>

export interface ResponsiveProviderProps {
  initialBreakpoint?: Breakpoint
  breakpoints: BreakpointsProp
}

export interface ResponsiveProviderState {
  breakpoints: BreakpointState
  breakpointKeys: BreakpointKeys
  mediaMatchers: MediaQueryList[]
}

export class ResponsiveProvider extends React.Component<
  ResponsiveProviderProps,
  ResponsiveProviderState
> {
  constructor(props: ResponsiveProviderProps) {
    super(props)
    const breakpointKeys = Object.keys(props.breakpoints) as BreakpointKeys

    // Build initial breakpoint map --> { breakpoint1: false, breakpoint2: false, ...etc}
    let breakpoints = breakpointKeys
      .map(breakpoint => ({
        [breakpoint]: breakpoint === props.initialBreakpoint ? true : false,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as BreakpointState

    let mediaMatchers = []
    const isClient = typeof window !== "undefined"

    if (isClient) {
      // Build up the MediaQueryList objects that observe mq changes
      mediaMatchers = this.setupMatchers(props.breakpoints, breakpointKeys)

      // Perform initial breakpoint check so that first render is correct
      breakpoints = this.checkBreakpoints(
        breakpoints,
        breakpointKeys,
        mediaMatchers
      )
    }

    this.state = {
      breakpoints,
      breakpointKeys,
      mediaMatchers,
    }
  }

  /**
   * Create an array of media matchers that can validate each breakpoint
   */
  setupMatchers = (
    breakpoints: BreakpointsProp,
    breakpointKeys: BreakpointKeys
  ): MediaQueryList[] => {
    return breakpointKeys.map(breakpoint =>
      window.matchMedia(breakpoints[breakpoint])
    )
  }

  /**
   * Uses the mediaMatchers list to build a map of the states of each breakpoint
   */
  checkBreakpoints = (
    breakpoints: BreakpointState,
    breakpointKeys: BreakpointKeys,
    mediaMatchers: MediaQueryList[]
  ): BreakpointState => {
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

export type ResponsiveProps = React.ComponentType<
  React.ConsumerProps<BreakpointState>
> & {
  children?: any
}

export const Responsive: ResponsiveProps = ResponsiveContext.Consumer
