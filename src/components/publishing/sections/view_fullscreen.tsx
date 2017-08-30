import * as PropTypes from "prop-types"
import * as React from "react"
import styled from "styled-components"
import Fonts from "../fonts"

interface ViewFullscreenProps extends React.HTMLProps<HTMLDivElement> {
  index?: number
}

const ViewFullscreen: React.SFC<ViewFullscreenProps> = (props, context) => {
  const onClick = e => {
    if (context.onViewFullscreen) {
      context.onViewFullscreen(props.index)
    }
  }
  return <ViewFullscreenLink onClick={onClick}>View Fullscreen</ViewFullscreenLink>
}

ViewFullscreen.contextTypes = {
  onViewFullscreen: PropTypes.func,
}

const ViewFullscreenLink = styled.div`
  ${Fonts.unica("s14", "medium")}
  margin: 0;
  margin-left: 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
  display: inline-block;
  min-width: 7.1em;
  white-space: nowrap;
  align-self: flex-start;
`

export default ViewFullscreen
