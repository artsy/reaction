import React from 'react'
import responsive from 'react-responsive-decorator'

// TODO: IProps

interface State {
  isMobile: boolean
}

const MOBILE_BREAKPOINT = 600

@responsive
export class Responsive extends React.Component<any, State> {
  static defaultProps = {
    mobileBreakpoint: MOBILE_BREAKPOINT
  }

  state = {
    isMobile: false
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
