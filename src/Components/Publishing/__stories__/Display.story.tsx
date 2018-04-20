import { storiesOf } from "@storybook/react"
import { clone, extend } from "lodash"
import React from "react"
import { DisplayCanvas } from "../Display/Canvas"
import { DisplayPanel } from "../Display/DisplayPanel"
import { StandardArticle } from "../Fixtures/Articles"
import { Sections } from "../Sections/Sections"

import {
  Campaign,
  UnitCanvasImage,
  UnitCanvasOverlay,
  UnitCanvasSlideshow,
  UnitCanvasVideo,
  UnitPanel,
  UnitPanelVideo,
} from "../Fixtures/Components"

const story = storiesOf("Publishing/Display", module)
  .add("Panel", () => {
    return <DisplayPanel unit={UnitPanel} campaign={Campaign} />
  })
  .add("Panel (mobile)", () => {
    return <DisplayPanel unit={UnitPanel} campaign={Campaign} isMobile />
  })
  .add("Panel without logo", () => {
    const unit = extend({}, UnitPanel, {
      logo: "",
    })
    return <DisplayPanel unit={unit} campaign={Campaign} />
  })
  .add("Panel: Video", () => {
    return <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} />
  })
  .add("Panel: Video (mobile)", () => {
    return <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} isMobile />
  })

const mobileAdInsertions = [["Image", UnitPanel], ["Video", UnitPanelVideo]]

mobileAdInsertions.forEach(([label, unit]) => {
  story.add(`Panel: ${label} injected into mobile body`, () => {
    const article = clone(StandardArticle)

    const DisplayPanelAd = () => (
      <DisplayPanel isMobile unit={unit} campaign={Campaign} />
    )

    return <Sections isMobile DisplayPanel={DisplayPanelAd} article={article} />
  })
})

story
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
