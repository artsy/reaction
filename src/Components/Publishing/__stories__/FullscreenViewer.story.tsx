import { storiesOf } from "@storybook/react"
import * as React from "react"
import Button from "../../Buttons/Default"
import { Images } from "../Fixtures/Components"
import FullscreenViewer from "../Sections/FullscreenViewer/FullscreenViewer"

class FullscreenViewerDemo extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { viewerIsOpen: false }
  }

  openViewer = () => {
    this.setState({ viewerIsOpen: true })
  }

  closeViewer = () => {
    this.setState({ viewerIsOpen: false })
  }

  render() {
    return (
      <div>
        <Button onClick={this.openViewer}>Open Fullscreen Viewer</Button>
        <FullscreenViewer onClose={this.closeViewer} show={this.state.viewerIsOpen} images={Images} />
      </div>
    )
  }
}

storiesOf("Publishing/Fullscreen Viewer", module).add("Button", () => {
  return <FullscreenViewerDemo />
})
