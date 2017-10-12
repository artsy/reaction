import { storiesOf } from "@storybook/react"
import * as React from "react"
import { ImageSetPreview } from "../Sections/ImagesetPreview"
import { ImageSetPreviewClassic } from "../Sections/ImagesetPreviewClassic"

import {
  Images,
  ImageSetFull,
  ImageSetFullSansTitle,
  ImageSetMini,
  ImageSetMiniSansTitle,
} from "../Fixtures/Components"

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
