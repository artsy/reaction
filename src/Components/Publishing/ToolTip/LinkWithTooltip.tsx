import url from "url"
import { defer } from "lodash"
import React, { Component } from "react"
import { ToolTip } from "./ToolTip"
import { OverlayTrigger } from "../../OverlayTrigger"
import PropTypes from "prop-types"
import styled, { StyledFunction } from "styled-components"
import Colors from "Assets/Colors"

interface Props {
  url: string
  showMarketData?: boolean
}

interface State {
  show: boolean
  inToolTip: boolean
  maybeHideToolTip: boolean
}

export class LinkWithTooltip extends Component<Props, State> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
  }

  state = {
    show: false,
    inToolTip: false,
    maybeHideToolTip: false,
  }

  urlToEntityType(): { entityType: string; slug: string } {
    const urlComponents = url.parse(this.props.url).pathname.split("/")
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

  leftLink = () => {
    this.setState({ maybeHideToolTip: true })
  }

  hideToolTIp = () => {
    this.setState({
      show: false,
      inToolTip: false,
      maybeHideToolTip: false,
    })
  }

  maybeHideToolTip = () => {
    const { inToolTip, maybeHideToolTip } = this.state

    setTimeout(() => {
      if (!inToolTip && maybeHideToolTip) {
        this.hideToolTIp()
      }
    }, 1000)
  }

  onLeaveLink = () => {
    this.leftLink()
    defer(this.maybeHideToolTip)
  }

  render() {
    const toolTipData = this.entityTypeToEntity()
    const { showMarketData } = this.props

    const toolTip = toolTipData ? (
      <ToolTip
        entity={toolTipData.entity}
        model={toolTipData.entityType}
        showMarketData={showMarketData}
        onMouseLeave={this.hideToolTIp}
        onMouseEnter={() => {
          this.setState({ inToolTip: true })
        }}
      />
    ) : (
      <div />
    )

    const { show } = this.state
    return (
      <OverlayTrigger
        show={show}
        placement="top"
        overlay={toolTip}
        rootClose
        onHide={this.hideToolTIp}
      >
        <Link
          target="_blank"
          onMouseEnter={() =>
            new Promise((resolve, reject) => {
              this.setState({ show: true }, resolve)
            })
          }
          onMouseLeave={this.onLeaveLink}
        >
          {this.props.children}
        </Link>
      </OverlayTrigger>
    )
  }
}

interface AProps {
  onMouseEnter: any
  onMouseLeave: any
  target: string
}

const A: StyledFunction<AProps> = styled.a

export const Link = A`
  background-image: none !important;
  border-bottom: 1.25px dashed ${Colors.graySemibold};
  display: inline-block;
  line-height: 21px;

  &:hover {
    border-bottom-color: ${Colors.grayDark};
  }
`
