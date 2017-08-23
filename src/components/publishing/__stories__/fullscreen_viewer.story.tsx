import { storiesOf } from "@storybook/react"
import * as React from "react"
import Button from "../../buttons/default"
import Articles from "../__test__/fixtures/articles"
import FullscreenViewer from "../sections/fullscreen_viewer/fullscreen_viewer"

class FullscreenViewerDemo extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { isViewerOpen: false }
    this.openViewer = this.openViewer.bind(this)
    this.closeViewer = this.closeViewer.bind(this)
  }

  openViewer() {
    this.setState({ isViewerOpen: true })
  }

  closeViewer() {
    this.setState({ isViewerOpen: false })
  }

  render() {
    return (
      <div>
        <Button onClick={this.openViewer}>Open Fullscreen Viewer</Button>
        <FullscreenViewer onClose={this.closeViewer} show={this.state.isViewerOpen} sections={Articles[1].sections} />
      </div>
    )
  }
}

storiesOf("Publishing/Fullscreen Viewer", module).add("Button", () => {
  return <FullscreenViewerDemo />
})
