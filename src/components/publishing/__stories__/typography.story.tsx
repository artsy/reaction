import { storiesOf } from "@storybook/react"
import * as React from "react"

import IconImageSet from "../icons/icon_imageset"
import Typography from "./typography_examples"

storiesOf("Publishing/Typography", module)
  .add("Icons", () => {
    return (
      <div style={{ width: 50 }}>
        <IconImageSet />
        <p>ImageSet</p>
      </div>
    )
  })
  .add("Typography", () => {
    return <Typography />
  })
