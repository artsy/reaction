import { storiesOf } from "@storybook/react"
import * as React from "react"

import IconImageSet from "../icons/imageset"
import IconRemove from "../icons/remove"
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
      </div>
    )
  })
  .add("Typography", () => {
    return <Typography />
  })
