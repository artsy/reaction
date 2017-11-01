import { storiesOf } from "@storybook/react"
import React from "react"
import { DisplayCanvas } from "../Display/Canvas"
import { DisplayPanel } from "../Display/DisplayPanel"
import {
  Campaign,
  UnitCanvasImage,
  UnitCanvasOverlay,
  UnitCanvasSlideshow,
  UnitCanvasVideo,
  UnitPanel,
  UnitPanelVideo
} from "../Fixtures/Components"

storiesOf("Publishing/Display", module)
  .add("Panel", () => {
    return <DisplayPanel unit={UnitPanel} campaign={Campaign} />
  })
  .add("Panel: Video", () => {
    return <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} />
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
