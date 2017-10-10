import * as PropTypes from "prop-types"
import * as React from "react"
import styled from "styled-components"
import { track } from "../../../utils/track"
import IconExpand from "../icon/expand"

interface ViewFullscreenProps extends React.HTMLProps<HTMLDivElement> {
  index?: number
}

@track()
class ViewFullscreen extends React.Component<ViewFullscreenProps, void> {
  static childContextTypes = {
    onViewFullscreen: PropTypes.func,
  }

  constructor(props) {
    super()
    this.onClick = this.onClick.bind(this)
  }

  @track({ action: "Clicked article impression" })
  onClick(e) {
    e.preventDefault()
    if (this.context.onViewFullscreen) {
      this.context.onViewFullscreen(this.props.index)
    }
  }

  render() {
    return (
      <ViewFullscreenLink onClick={this.onClick}>
        <IconExpand />
      </ViewFullscreenLink>
    )
  }
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
