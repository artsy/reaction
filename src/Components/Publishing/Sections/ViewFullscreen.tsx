import * as PropTypes from "prop-types"
import * as React from "react"
import styled from "styled-components"
import { track } from "../../../Utils/track"
import IconExpand from "../Icon/Expand"
import FullscreenViewer from "./FullscreenViewer/FullscreenViewer"

interface ViewFullscreenProps extends React.HTMLProps<HTMLDivElement> {
  index?: number
  images?: [object]
  slideIndex?: number
}

@track()
class ViewFullscreen extends React.Component<ViewFullscreenProps, any> {
  static childContextTypes = {
    onViewFullscreen: PropTypes.func,
  }

  constructor(props) {
    super()
    this.openViewer = this.openViewer.bind(this)
    this.state = { viewerIsOpen: false }
  }

  @track({ action: "Clicked article impression" })
  openViewer(e) {
    e.preventDefault()
    this.setState({ viewerIsOpen: true })
  }

  closeViewer = e => {
    this.setState({ viewerIsOpen: false })
  }

  render() {
    return (
      <div>
        <ViewFullscreenLink onClick={this.openViewer}>
          <IconExpand />
        </ViewFullscreenLink>
        <FullscreenViewer
          slideIndex={this.props.slideIndex}
          onClose={this.closeViewer}
          show={this.state.viewerIsOpen}
          images={this.props.images}
        />
      </div>
    )
  }
}

export const ViewFullscreenLink = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
`

export default ViewFullscreen
