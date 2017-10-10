import { storiesOf } from "@storybook/react"
import * as React from "react"

import ImageSetPreview from "../sections/imageset_preview"
import ImageSetPreviewClassic from "../sections/imageset_preview_classic"

import {
  Images,
  ImageSetFull,
  ImageSetFullSansTitle,
  ImageSetMini,
  ImageSetMiniSansTitle,
} from "../fixtures/components"

storiesOf("Publishing/Imageset Preview", module)
  .add("Imageset Preview - Classic", () => {
    return <ImageSetPreviewClassic images={Images} />
  })
  .add("Imageset Preview", () => {
    return (
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
    )
  })
