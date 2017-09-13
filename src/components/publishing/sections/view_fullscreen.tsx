import * as PropTypes from "prop-types"
import * as React from "react"
import styled from "styled-components"
import IconExpand from "../icon/expand"

interface ViewFullscreenProps extends React.HTMLProps<HTMLDivElement> {
  index?: number
}

const ViewFullscreen: React.SFC<ViewFullscreenProps> = (props, context) => {
  const onClick = e => {
    e.preventDefault()
    if (context.onViewFullscreen) {
      context.onViewFullscreen(props.index)
    }
  }
  return (
    <ViewFullscreenLink onClick={onClick}>
      <IconExpand />
    </ViewFullscreenLink>
  )
}

ViewFullscreen.contextTypes = {
  onViewFullscreen: PropTypes.func,
}

const ViewFullscreenLink = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  opacity: .6;
  transition: opacity .3s;
  &:hover {
    opacity: 1;
  }
`

export default ViewFullscreen
