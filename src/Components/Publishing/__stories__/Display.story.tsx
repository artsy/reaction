import { storiesOf } from "@storybook/react"
import { clone } from 'lodash'
import React from "react"
import { DisplayCanvas } from "../Display/Canvas"
import { DisplayPanel } from "../Display/DisplayPanel"
import { BasicArticle } from '../Fixtures/Articles'
import {
  Campaign,
  UnitCanvasImage,
  UnitCanvasOverlay,
  UnitCanvasSlideshow,
  UnitCanvasVideo,
  UnitPanel,
  UnitPanelVideo
} from "../Fixtures/Components"
import { Sections } from "../Sections/Sections"

const story = storiesOf("Publishing/Display", module)
  .add("Panel", () => {
    return <DisplayPanel unit={UnitPanel} campaign={Campaign} />
  })
  .add("Panel: Video", () => {
    return <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} />
  })
  .add("Panel: Video (mobile)", () => {
    return <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} isMobile />
  })

const mobileAdInsertions = [
  ['Image', UnitPanel],
  ['Video', UnitPanelVideo]
]

mobileAdInsertions.forEach(([label, unit]) => {
  story.add(`Panel: ${label} injected into mobile body`, () => {
    const article = clone(BasicArticle)
    article.sections = [article.sections[1]]

    const DisplayPanelAd = () =>
      <DisplayPanel
        unit={unit}
        campaign={Campaign}
      />

    return (
      <Sections isMobile
        DisplayPanel={DisplayPanelAd}
        article={article}
      />
    )
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
