import React, { Component } from "react"
import { ToolTip } from "./ToolTip"
import { OverlayTrigger } from "../../OverlayTrigger"
import PropTypes from "prop-types"
import { Gene } from "../Fixtures/Components"

interface Props {
  url: string
  node: any
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
    const toolTip = (
      <div>
        <ToolTip entity={Gene} model="gene" />
      </div>
    )

    return (
      <OverlayTrigger show={show} placement="top" overlay={toolTip}>
        <a
          href={this.props.url}
          onMouseEnter={() => this.setState({ show: true })}
          onMouseLeave={() => this.setState({ show: false })}
        >
          {this.props.children}
        </a>
      </OverlayTrigger>
    )
  }
}
