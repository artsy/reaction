import { storiesOf } from "@storybook/react"
import React from "react"
import { FullScreenProvider } from "../Sections/FullscreenViewer/FullScreenProvider"
import { ImageSetPreview } from "../Sections/ImageSetPreview"
import { ImageSetPreviewClassic } from "../Sections/ImageSetPreviewClassic"

import {
  Images,
  ImageSetFull,
  ImageSetFullSansTitle,
  ImageSetMini,
  ImageSetMiniSansTitle,
} from "../Fixtures/Components"

storiesOf("Publishing/Sections/Image Set/Classic", module).add(
  "Preview",
  () => {
    return <ImageSetPreviewClassic images={Images} />
  }
)

storiesOf("Publishing/Sections/Image Set/Editorial/Full", module)
  .add("Full", () => {
    return (
      <FullScreenProvider>
        <div style={{ maxWidth: 680, width: "100%" }}>
          <ImageSetPreview section={ImageSetFull} />
        </div>
      </FullScreenProvider>
    )
  })
  .add("No title", () => {
    return (
      <FullScreenProvider>
        <div style={{ maxWidth: 680, width: "100%" }}>
          <ImageSetPreview section={ImageSetFullSansTitle} />
        </div>
      </FullScreenProvider>
    )
  })
storiesOf("Publishing/Sections/Image Set/Editorial/Mini", module)
  .add("Mini", () => {
    return (
      <FullScreenProvider>
        <div style={{ maxWidth: 680, width: "100%" }}>
          <ImageSetPreview section={ImageSetMini} />
        </div>
      </FullScreenProvider>
    )
  })
  .add("No title", () => {
    return (
      <FullScreenProvider>
        <div style={{ maxWidth: 680, width: "100%" }}>
          <ImageSetPreview section={ImageSetMiniSansTitle} />
        </div>
      </FullScreenProvider>
    )
  })
