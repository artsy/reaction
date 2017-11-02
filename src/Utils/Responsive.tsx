import { each } from 'lodash'
import React from 'react'
import theme from '../Assets/Theme'

// TODO: IProps
// TODO: Docs
// TODO: Tests

interface State {
  isMobile: boolean
}

const MOBILE_BREAKPOINT = 600

class ResponsiveWrapper extends React.Component<any, State> {

  static defaultProps = {
    initialState: {
      isMobile: false
    },
    media: x => x,
    mobileBreakpoint: MOBILE_BREAKPOINT
  }

  state = {
    isMobile: false
  }

  constructor(props) {
    super(props)

    this.state = {
      ...props.initialState
    }
  }

  componentDidMount() {
    this.registerBreakpoints()
  }

  registerBreakpoints() {
    const { mobileBreakpoint, media } = this.props
    const { breakpoints } = theme.publishing

    /**
     * Iterate over breakpoints in theme file and generate corresponding
     * handlers for each. Options include xs, sm, md, lg, xl.
     */
    const registerMedia = ({ breakpoint, width }) => {
      const toggle = () => Object
        .keys(breakpoints)
        .reduce((acc, bp) => ({ ...acc, [bp]: false }), {})

      const breakAt: any = [
        { maxWidth: width },
        { minWidth: width + 1 }
      ]

      breakAt.forEach(point => {
        media(point, () => {
          this.setState({
            ...toggle(),
            [breakpoint]: true
          })
        })
      })
    }

    each(breakpoints, (width, breakpoint) => {
      registerMedia({
        breakpoint,
        width
      })
    })

    // TODO:
    // Remove references below in favor of above

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
    return (
      this.props.children(this.state)
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
