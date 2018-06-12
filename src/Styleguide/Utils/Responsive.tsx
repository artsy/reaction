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
  mediaMatchers: MediaQueryList[]
  mqHandler: MediaQueryListListener | null
}

export class ResponsiveProvider extends React.Component<
  ResponsiveProviderProps,
  ResponsiveProviderState
> {
  constructor(props) {
    super(props)
    this.state = {
      breakpoints: {
        ...Object.keys(props.breakpoints)
          .map(breakpoint => ({
            [breakpoint]: breakpoint === props.initialBreakpoint ? true : false,
          }))
          .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      },
      mediaMatchers: [],
      mqHandler: null,
    }
    this.setupObservers(this.props.breakpoints)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.children !== this.props.children) return true
    if (shallowEqual(this.state.breakpoints, nextState.breakpoints)) {
      return false
    }
    return true
  }

  componentWillUnmount() {
    if (this.state.mqHandler) {
      this.state.mediaMatchers.forEach(mediaQuery =>
        mediaQuery.removeListener(this.state.mqHandler)
      )
    }
  }

  setupObservers = breakpoints => {
    const breakpointKeys = Object.keys(breakpoints)
    const mediaMatchers = breakpointKeys.map(breakpoint =>
      window.matchMedia(breakpoints[breakpoint])
    )
    const mqHandler = () => {
      for (let i = 0; i < mediaMatchers.length; ++i) {
        this.setState({
          breakpoints: {
            ...this.state.breakpoints,
            [breakpointKeys[i]]: mediaMatchers[i].matches,
          },
        })
      }
    }
    this.setState({ mediaMatchers, mqHandler })
    mediaMatchers.forEach(mediaQuery => {
      mediaQuery.addListener(mqHandler)
    })
    mqHandler()
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
