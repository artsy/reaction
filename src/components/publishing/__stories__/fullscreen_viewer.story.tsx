import { storiesOf } from "@storybook/react"
import * as React from "react"
import Articles from "../__test__/fixtures/articles"
import FullscreenViewer from "../sections/fullscreen_viewer/fullscreen_viewer"
import ViewFullscreen from "../sections/view_fullscreen"

storiesOf("Publishing/Fullscreen Viewer", module).add("Images", () => {
  return (
    <div>
      <ViewFullscreen />
      <FullscreenViewer sections={Articles[1].sections} />
    </div>
  )
})
