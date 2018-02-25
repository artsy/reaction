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

storiesOf("Publishing/Image Set Preview", module)
  .add("Imageset Preview - Classic", () => {
    return <ImageSetPreviewClassic images={Images} />
  })
  .add("Imageset Preview", () => {
    return (
      <FullScreenProvider>
        <div style={{ maxWidth: 680, width: "100%" }}>
          <ImageSetPreview section={ImageSetFull} />
          <br />
          <ImageSetPreview section={ImageSetMini} />
          <br />
          <p>Without titles:</p>
          <ImageSetPreview section={ImageSetFullSansTitle} />
          <br />
          <ImageSetPreview section={ImageSetMiniSansTitle} />
        </div>
      </FullScreenProvider>
    )
  })
