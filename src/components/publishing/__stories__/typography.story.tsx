import { storiesOf } from "@storybook/react"
import * as React from "react"

import IconImageset from "../icons/icon_imageset"
import Typography from "./typography_examples"

storiesOf("Publishing/Typography", module)
  .add("Icons", () => {
    return (
      <div style={{ width: 50 }}>
        <IconImageset />
        <p>Imageset</p>
      </div>
    )
  })
  .add("Typography", () => {
    return <Typography />
  })
