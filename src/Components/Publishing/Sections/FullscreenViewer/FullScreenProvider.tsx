import { isFunction } from "lodash"
import PropTypes from "prop-types"
import { Component } from "react"

interface Props {
  children: any
}

interface State {
  viewerIsOpen: boolean
  slideIndex: number
}

export class FullScreenProvider extends Component<Props, State> {
  state = {
    slideIndex: 0,
    viewerIsOpen: false,
  }

  static childContextTypes = {
    onViewFullscreen: PropTypes.func.isRequired,
    openViewer: PropTypes.func.isRequired,
    closeViewer: PropTypes.func.isRequired,
    slideIndex: PropTypes.number.isRequired,
    viewerIsOpen: PropTypes.bool.isRequired,
  }

  getChildContext() {
    return {
      onViewFullscreen: this.openViewer,
      openViewer: this.openViewer,
      closeViewer: this.closeViewer,
      slideIndex: this.state.slideIndex,
      viewerIsOpen: this.state.viewerIsOpen,
    }
  }

  openViewer = index => {
    const body = document.getElementsByTagName("BODY")[0]
    body.setAttribute("style", "overflow: hidden;")

    this.setState({
      viewerIsOpen: true,
      slideIndex: index,
    })
  }

  closeViewer = () => {
    const body = document.getElementsByTagName("BODY")[0]
    body.setAttribute("style", "overflow: scroll;")
    this.setState({
      viewerIsOpen: false,
    })
  }

  render() {
    const { slideIndex, viewerIsOpen } = this.state

    if (isFunction(this.props.children)) {
      return this.props.children({
        slideIndex,
        viewerIsOpen,
        openViewer: this.openViewer,
        closeViewer: this.closeViewer,
      })
    } else {
      return this.props.children
    }
  }
}
