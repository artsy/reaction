import { storiesOf } from "@storybook/react"
import * as React from "react"
import DisplayCanvas from "../display/canvas/index"
import DisplayPanel from "../display/display_panel"
import {
  Campaign,
  UnitCanvasImage,
  UnitCanvasOverlay,
  UnitCanvasSlideshow,
  UnitCanvasVideo,
  UnitPanel,
} from "../fixtures/components"

storiesOf("Publishing/Display", module)
  .add("Panel", () => {
    return <DisplayPanel unit={UnitPanel} campaign={Campaign} />
  })
  .add("Canvas: Overlay", () => {
    return <DisplayCanvas unit={UnitCanvasOverlay} campaign={Campaign} />
  })
  .add("Canvas: Image", () => {
    return <DisplayCanvas unit={UnitCanvasImage} campaign={Campaign} />
  })
  .add("Canvas: Video", () => {
    return <DisplayCanvas unit={UnitCanvasVideo} campaign={Campaign} />
  })
  .add("Canvas: Slideshow", () => {
    return <DisplayCanvas unit={UnitCanvasSlideshow} campaign={Campaign} />
  })
