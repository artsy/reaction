import React from "react"
import { animated, Spring } from "react-spring"

export interface CollapseProps {
  open: boolean
}

export class Collapse extends React.Component<CollapseProps> {
  state = {
    mounted: false,
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  render() {
    return (
      <Spring
        native
        immediate={!this.state.mounted}
        from={{ height: 0 }}
        to={{ height: this.props.open ? "auto" : 0 }}
      >
        {props => (
          <animated.div style={{ ...props, overflow: "hidden" }}>
            {this.props.children}
          </animated.div>
        )}
      </Spring>
    )
  }
}
