import { storiesOf } from "@storybook/react"
import { isHTLAdEnabled } from "Components/Publishing/Ads/EnabledAd"
import { clone, extend } from "lodash"
import React from "react"
import { getCurrentUnixTimestamp } from "../Constants"
import { DisplayCanvas } from "../Display/Canvas"
import { DisplayPanel } from "../Display/DisplayPanel"
import { NewDisplayCanvas } from "../Display/NewDisplayCanvas"
import { NewDisplayPanel } from "../Display/NewDisplayPanel"
import { StandardArticle } from "../Fixtures/Articles"
import { Sections } from "../Sections/Sections"

import {
  Campaign,
  StandardArticleHostedAdCanvas,
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
    return <DisplayPanel unit={UnitPanel} campaign={Campaign} />
  })
  .add("Panel with 3rd party tracking", () => {
    return isHTLAdEnabled() ? (
      <NewDisplayPanel
        adUnit={StandardArticleHostedAdPanel.adUnit}
        adDimension={StandardArticleHostedAdPanel.adDimension}
      />
    ) : (
      <DisplayPanel
        unit={UnitPanelTracked}
        campaign={Campaign}
        renderTime={getCurrentUnixTimestamp()}
      />
    )
  })
  .add("Mobile Panel", () => {
    return isHTLAdEnabled() ? (
      <NewDisplayPanel
        adUnit={StandardArticleHostedAdPanel.adUnit}
        adDimension={StandardArticleHostedAdPanel.adDimension}
      />
    ) : (
      <DisplayPanel unit={UnitPanel} campaign={Campaign} isMobile />
    )
  })
  .add("Without logo", () => {
    const unit = extend({}, UnitPanel, {
      logo: "",
    })
    return isHTLAdEnabled() ? (
      <NewDisplayPanel
        adUnit={StandardArticleHostedAdPanel.adUnit}
        adDimension={StandardArticleHostedAdPanel.adDimension}
      />
    ) : (
      <DisplayPanel unit={unit} campaign={Campaign} />
    )
  })
  .add("Video", () => {
    return isHTLAdEnabled() ? (
      <NewDisplayPanel
        adUnit={StandardArticleHostedAdPanel.adUnit}
        adDimension={StandardArticleHostedAdPanel.adDimension}
      />
    ) : (
      <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} />
    )
  })
  .add("Video (mobile)", () => {
    return isHTLAdEnabled() ? (
      <NewDisplayPanel
        adUnit={StandardArticleHostedAdPanel.adUnit}
        adDimension={StandardArticleHostedAdPanel.adDimension}
      />
    ) : (
      <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} isMobile />
    )
  })

const mobileAdInsertions = [["Image", UnitPanel], ["Video", UnitPanelVideo]]

mobileAdInsertions.forEach(([label, unit]) => {
  story.add(`${label} injected into mobile body`, () => {
    const article = clone(StandardArticle)

    const DisplayPanelAd = () =>
      isHTLAdEnabled ? (
        <NewDisplayPanel
          adUnit={StandardArticleHostedAdPanel.adUnit}
          adDimension={StandardArticleHostedAdPanel.adDimension}
        />
      ) : (
        <DisplayPanel isMobile unit={unit} campaign={Campaign} />
      )

    return <Sections isMobile DisplayPanel={DisplayPanelAd} article={article} />
  })
})

storiesOf("Publishing/Display/Canvas", module)
  .add("Overlay", () => {
    return isHTLAdEnabled() ? (
      <NewDisplayCanvas
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    ) : (
      <DisplayCanvas unit={UnitCanvasOverlay} campaign={Campaign} />
    )
  })
  .add("Overlay with 3rd party tracking", () => {
    return isHTLAdEnabled() ? (
      <NewDisplayCanvas
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    ) : (
      <DisplayCanvas
        unit={UnitCanvasTracked}
        campaign={Campaign}
        renderTime={getCurrentUnixTimestamp()}
      />
    )
  })
  .add("Image", () => {
    return isHTLAdEnabled() ? (
      <NewDisplayCanvas
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    ) : (
      <DisplayCanvas unit={UnitCanvasImage} campaign={Campaign} />
    )
  })
  .add("Video", () => {
    return isHTLAdEnabled() ? (
      <NewDisplayCanvas
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    ) : (
      <DisplayCanvas unit={UnitCanvasVideo} campaign={Campaign} />
    )
  })
  .add("Slideshow", () => {
    return isHTLAdEnabled() ? (
      <NewDisplayCanvas
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    ) : (
      <DisplayCanvas unit={UnitCanvasSlideshow} campaign={Campaign} />
    )
  })
