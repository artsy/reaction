import { storiesOf } from "@storybook/react"
import { clone, extend } from "lodash"
import React from "react"
import { getCurrentUnixTimestamp } from "../Constants"
import { DisplayCanvas } from "../Display/Canvas"
import { DisplayPanel } from "../Display/DisplayPanel"
import { StandardArticle } from "../Fixtures/Articles"
import { Sections } from "../Sections/Sections"

import {
  Campaign,
  UnitCanvasImage,
  UnitCanvasOverlay,
  UnitCanvasSlideshow,
  UnitCanvasTracked,
  UnitCanvasVideo,
  UnitPanel,
  UnitPanelTracked,
  UnitPanelVideo,
} from "../Fixtures/Components"

const story = storiesOf("Publishing/Display/Panel", module)
  .add("Panel", () => {
    return <DisplayPanel unit={UnitPanel} campaign={Campaign} />
  })
  .add("Panel with 3rd party tracking", () => {
    return (
      <DisplayPanel
        unit={UnitPanelTracked}
        campaign={Campaign}
        renderTime={getCurrentUnixTimestamp()}
      />
    )
  })
  .add("Mobile Panel", () => {
    return <DisplayPanel unit={UnitPanel} campaign={Campaign} isMobile />
  })
  .add("Without logo", () => {
    const unit = extend({}, UnitPanel, {
      logo: "",
    })
    return <DisplayPanel unit={unit} campaign={Campaign} />
  })
  .add("Video", () => {
    return <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} />
  })
  .add("Video (mobile)", () => {
    return <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} isMobile />
  })

const mobileAdInsertions = [["Image", UnitPanel], ["Video", UnitPanelVideo]]

mobileAdInsertions.forEach(([label, unit]) => {
  story.add(`${label} injected into mobile body`, () => {
    const article = clone(StandardArticle)

    const DisplayPanelAd = () => (
      <DisplayPanel isMobile unit={unit} campaign={Campaign} />
    )

    return <Sections isMobile DisplayPanel={DisplayPanelAd} article={article} />
  })
})

storiesOf("Publishing/Display/Canvas", module)
  .add("Overlay", () => {
    return <DisplayCanvas unit={UnitCanvasOverlay} campaign={Campaign} />
  })
  .add("Overlay with 3rd party tracking", () => {
    return (
      <DisplayCanvas
        unit={UnitCanvasTracked}
        campaign={Campaign}
        renderTime={getCurrentUnixTimestamp()}
      />
    )
  })
  .add("Image", () => {
    return <DisplayCanvas unit={UnitCanvasImage} campaign={Campaign} />
  })
  .add("Video", () => {
    return <DisplayCanvas unit={UnitCanvasVideo} campaign={Campaign} />
  })
  .add("Slideshow", () => {
    return <DisplayCanvas unit={UnitCanvasSlideshow} campaign={Campaign} />
  })
