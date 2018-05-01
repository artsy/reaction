import React, { Component } from "react"
import { ToolTip } from "./ToolTip"
import { OverlayTrigger } from "../../OverlayTrigger"
import PropTypes from "prop-types"

interface Props {
  url: string
}

interface State {
  show: boolean
}

export class LinkWithTooltip extends Component<Props, State> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
  }

  state = {
    show: false,
  }

  render() {
    const { show } = this.state
    const toolTip = <ToolTip entity={null} model={null} />

    return (
      <OverlayTrigger show={show} placement="bottom" overlay={toolTip}>
        <a
          onMouseEnter={() => this.setState({ show: true })}
          onMouseLeave={() => this.setState({ show: false })}
        >
          {this.props.children}
        </a>
      </OverlayTrigger>
    )
  }
}
