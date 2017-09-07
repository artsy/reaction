import { storiesOf } from "@storybook/react"
import * as React from "react"

import IconExpand from "../icon/expand"
import IconImageSet from "../icon/image_set"
import IconLayoutFullscreen from "../icon/layout_fullscreen"
import IconLayoutSplit from "../icon/layout_split"
import IconLayoutText from "../icon/layout_text"
import IconRemove from "../icon/remove"
import Typography from "./typography_examples"

storiesOf("Publishing/Typography", module)
  .add("Icons", () => {
    return (
      <div>
        <div style={{ width: 50 }}>
          <IconImageSet />
          <p>ImageSet</p>
        </div>
        <div style={{ width: 50 }}>
          <IconRemove />
          <p>Remove</p>
        </div>
        <div style={{ width: 50 }}>
          <IconExpand />
          <p>Expand</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLayoutSplit />
          <p>Layout Split</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLayoutText />
          <p>Layout Text</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLayoutFullscreen />
          <p>Layout Fullscreen</p>
        </div>
      </div>
    )
  })
  .add("Typography", () => {
    return <Typography />
  })
