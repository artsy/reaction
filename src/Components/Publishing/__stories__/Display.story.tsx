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
  StandardArticleHostedAdPanel,
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
    return (
      <DisplayPanel
        unit={UnitPanel}
        campaign={Campaign}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
  .add("Panel with 3rd party tracking", () => {
    return (
      <DisplayPanel
        unit={UnitPanelTracked}
        campaign={Campaign}
        renderTime={getCurrentUnixTimestamp()}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
  .add("Mobile Panel", () => {
    return (
      <DisplayPanel
        unit={UnitPanel}
        campaign={Campaign}
        isMobile
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
  .add("Without logo", () => {
    const unit = extend({}, UnitPanel, {
      logo: "",
    })
    return (
      <DisplayPanel
        unit={unit}
        campaign={Campaign}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
  .add("Video", () => {
    return (
      <DisplayPanel
        unit={UnitPanelVideo}
        campaign={Campaign}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
  .add("Video (mobile)", () => {
    return (
      <DisplayPanel
        unit={UnitPanelVideo}
        campaign={Campaign}
        isMobile
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })

const mobileAdInsertions = [["Image", UnitPanel], ["Video", UnitPanelVideo]]

mobileAdInsertions.forEach(([label, unit]) => {
  story.add(`${label} injected into mobile body`, () => {
    const article = clone(StandardArticle)

    const DisplayPanelAd = () => (
      <DisplayPanel
        isMobile
        unit={unit}
        campaign={Campaign}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )

    return <Sections isMobile DisplayPanel={DisplayPanelAd} article={article} />
  })
})

storiesOf("Publishing/Display/Canvas", module)
  .add("Overlay", () => {
    return (
      <DisplayCanvas
        unit={UnitCanvasOverlay}
        campaign={Campaign}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
  .add("Overlay with 3rd party tracking", () => {
    return (
      <DisplayCanvas
        unit={UnitCanvasTracked}
        campaign={Campaign}
        renderTime={getCurrentUnixTimestamp()}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
  .add("Image", () => {
    return (
      <DisplayCanvas
        unit={UnitCanvasImage}
        campaign={Campaign}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
  .add("Video", () => {
    return (
      <DisplayCanvas
        unit={UnitCanvasVideo}
        campaign={Campaign}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
  .add("Slideshow", () => {
    return (
      <DisplayCanvas
        unit={UnitCanvasSlideshow}
        campaign={Campaign}
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
      />
    )
  })
