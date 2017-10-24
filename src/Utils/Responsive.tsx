import React from 'react'

// TODO: IProps

interface State {
  isMobile: boolean
}

const MOBILE_BREAKPOINT = 600

class ResponsiveWrapper extends React.Component<any, State> {
  static defaultProps = {
    initialState: {
      isMobile: false
    },
    media: x => x, // FIXME: Force: `media` is not a function
    mobileBreakpoint: MOBILE_BREAKPOINT
  }

  state = {
    isMobile: false
  }

  constructor(props) {
    super(props)

    const {
      initialState: {
        isMobile
      }
    } = props

    this.state = {
      isMobile
    }
  }

  componentDidMount() {
    const { mobileBreakpoint, media } = this.props

    // Mobile
    media({ maxWidth: mobileBreakpoint }, () => {
      this.setState({
        isMobile: true
      });
    });

    // Desktop
    media({ minWidth: mobileBreakpoint + 1 }, () => {
      this.setState({
        isMobile: false
      });
    });
  }

  render() {
    const { isMobile } = this.state

    return (
      this.props.children({
        isMobile
      })
    )
  }
}

/**
 * Since Enquire.js requires a DOM, ensure that the environment is correct before
 * returning component.
 */
const wrapIfClient = (Component) => {
  const isClient = typeof window !== 'undefined'

  if (isClient) {
    const makeResponsive = require('react-responsive-decorator')
    return makeResponsive(Component)
  } else {
    return Component
  }
}

export const Responsive = wrapIfClient(ResponsiveWrapper)
