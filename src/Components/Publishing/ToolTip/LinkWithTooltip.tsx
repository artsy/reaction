import React, { Component } from "react"
import { ToolTip } from "./ToolTip"
import { OverlayTrigger } from "../../OverlayTrigger"
import PropTypes from "prop-types"

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

  urlToEntityType(): { entityType: string; slug: string } {
    const urlComponents = new URL(this.props.url).pathname.split("/")
    urlComponents.shift()

    return {
      entityType: urlComponents[0],
      slug: urlComponents[1],
    }
  }

  entityTypeToEntity() {
    const { entityType, slug } = this.urlToEntityType()
    const data = this.context.tooltipsData
    const collectionKey = entityType + "s"

    if (!data || !data[collectionKey]) return null

    return {
      entityType,
      entity: data[collectionKey][slug],
    }
  }

  render() {
    const toolTipData = this.entityTypeToEntity()

    const toolTip = toolTipData ? (
      <div>
        <ToolTip entity={toolTipData.entity} model={toolTipData.entityType} />
      </div>
    ) : (
      <div />
    )

    const { show } = this.state
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
