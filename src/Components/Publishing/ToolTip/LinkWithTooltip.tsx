import url from "url"
import { defer } from "lodash"
import { findDOMNode } from "react-dom"
import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { ToolTip } from "./ToolTip"
import Colors from "Assets/Colors"
import FadeTransition from "../../Animation/FadeTransition"

interface Props {
  url: string
  showMarketData?: boolean
}

interface State {
  inToolTip: boolean
  maybeHideToolTip: boolean
  position: object | null
  orientation?: string
}

export class LinkWithTooltip extends Component<Props, State> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
    onTriggerToolTip: PropTypes.func,
    activeToolTip: PropTypes.any,
  }

  public link: any
  public SetupToolTipPosition: any

  state = {
    inToolTip: false,
    maybeHideToolTip: false,
    position: null,
    orientation: "up",
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
    this.SetupToolTipPosition = () => defer(this.setupToolTipPosition)
    this.setupToolTipPosition()

    window.addEventListener("scroll", this.SetupToolTipPosition)
    window.addEventListener("resize", this.SetupToolTipPosition)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.SetupToolTipPosition)
    window.removeEventListener("resize", this.SetupToolTipPosition)
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
    this.context.onTriggerToolTip(null)

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

  getOrientation = position => {
    const height = window ? window.innerHeight : 0
    const linkPosition = position.top
    const orientation = height - linkPosition > 350 ? "down" : "up"

    return orientation
  }

  setupToolTipPosition = () => {
    if (this.link) {
      const position = findDOMNode(this.link).getBoundingClientRect()
      const orientation = this.getOrientation(position)

      this.setState({ position, orientation })
    }
  }

  render() {
    const { showMarketData, url } = this.props
    const { activeToolTip, onTriggerToolTip } = this.context
    const { orientation } = this.state

    const toolTipData = this.entityTypeToEntity()
    const { entity, entityType } = toolTipData
    const id = entity ? entity.id : null
    const show = id && id === activeToolTip

    const toolTipLeft = this.getToolTipPosition(entityType)

    return (
      <Link
        onMouseEnter={() => {
          onTriggerToolTip(id && id)
        }}
        ref={link => (this.link = link)}
      >
        <PrimaryLink href={url} target="_blank">
          {this.props.children}
        </PrimaryLink>

        <FadeTransition
          in={show}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 200, exit: 250 }}
        >
          <ToolTip
            entity={entity}
            model={entityType}
            showMarketData={showMarketData}
            onMouseLeave={this.hideToolTip}
            onMouseEnter={() => {
              this.setState({ inToolTip: true })
            }}
            positionLeft={toolTipLeft}
            orientation={orientation}
          />
        </FadeTransition>

        {show && <Background onMouseLeave={this.onLeaveLink} />}
      </Link>
    )
  }
}

const PrimaryLink = styled.a`
  background-image: none !important;
  text-decoration: none;
  color: black;
  line-height: 20px;
  border-bottom: 1.25px dashed ${Colors.graySemibold};
  z-index: 0;
`

export const Link = styled.div.attrs<{ onMouseEnter: any }>({})`
  display: inline-block;
  position: relative;
  cursor: pointer;
  &:hover {
    ${PrimaryLink} {
      opacity: 0.65;
      border-bottom-color: ${Colors.grayDark};
      color: ${Colors.grayDark};
    }
  }
`

export const Background = styled.div`
  position: absolute;
  left: 0;
  top: -10px;
  bottom: -10px;
  right: 0;
`
