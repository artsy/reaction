import url from "url"
import { defer } from "lodash"
import React, { Component } from "react"
import { ToolTip } from "./ToolTip"
import PropTypes from "prop-types"
import styled from "styled-components"
import Colors from "Assets/Colors"
import { findDOMNode } from "react-dom"

interface Props {
  url: string
  showMarketData?: boolean
}

interface State {
  inToolTip: boolean
  maybeHideToolTip: boolean
  position: object | null
}

export class LinkWithTooltip extends Component<Props, State> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
    onOpenToolTip: PropTypes.func,
    activeToolTip: PropTypes.any,
  }

  public link: any

  state = {
    inToolTip: false,
    maybeHideToolTip: false,
    position: null,
  }

  urlToEntityType(): { entityType: string; slug: string } {
    const urlComponents = url.parse(this.props.url).pathname.split("/")
    urlComponents.shift()

    return {
      entityType: urlComponents[0],
      slug: urlComponents[1],
    }
  }

  componentDidMount() {
    if (this.link) {
      const position = findDOMNode(this.link).getBoundingClientRect()
      this.setState({ position })
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

  hideToolTip = () => {
    this.context.onOpenToolTip(null)

    this.setState({
      inToolTip: false,
      maybeHideToolTip: false,
    })
  }

  maybeHideToolTip = () => {
    const { inToolTip, maybeHideToolTip } = this.state
    setTimeout(() => {
      if (!inToolTip && maybeHideToolTip) {
        this.hideToolTip()
      }
    }, 750)
  }

  onLeaveLink = () => {
    this.leftLink()
    defer(this.maybeHideToolTip)
  }

  getToolTipPosition = type => {
    if (this.link) {
      const { width, x } = this.state.position
      const anchorPosition = width / 2
      const toolTipWidth = type === "artist" ? 360 : 280

      const toolTipLeft = anchorPosition - toolTipWidth / 2
      const isAtWindowBoundary = x + toolTipLeft < 10

      if (isAtWindowBoundary) {
        return 10 - x
      } else {
        return toolTipLeft
      }
    }
  }

  render() {
    const { showMarketData } = this.props
    const { activeToolTip, onOpenToolTip } = this.context

    const toolTipData = this.entityTypeToEntity()
    const { entity, entityType } = toolTipData
    const id = entity ? entity.id : null
    const show = id && id === activeToolTip

    const toolTipLeft = this.getToolTipPosition(entityType)

    return (
      <Link
        onMouseEnter={() => {
          onOpenToolTip(id && id)
        }}
        ref={link => (this.link = link)}
      >
        {this.props.children}

        {show && (
          <ToolTip
            entity={entity}
            model={entityType}
            showMarketData={showMarketData}
            onMouseLeave={this.hideToolTip}
            onMouseEnter={() => {
              this.setState({ inToolTip: true })
            }}
            positionLeft={toolTipLeft}
          />
        )}
        {show && <Background onMouseLeave={this.onLeaveLink} />}
      </Link>
    )
  }
}

export const Link = styled.div.attrs<{ onMouseEnter: any }>({})`
  background-image: none !important;
  border-bottom: 1.25px dashed ${Colors.graySemibold};
  display: inline-block;
  line-height: 21px;
  position: relative;

  &:hover {
    border-bottom-color: ${Colors.grayDark};
  }
`
export const Background = styled.div`
  position: absolute;
  left: 0;
  top: -10px;
  bottom: -10px;
  right: 0;
`
