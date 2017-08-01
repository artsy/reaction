import { storiesOf } from "@storybook/react"
import * as React from "react"

import Video from "../video"

import { Videos } from "../__test__/fixtures"

storiesOf("Publishing/Video", module).add("Video", () => {
  return (
    <div>
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[0]} layout="standard" />
      </div>
      <br />
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[1]} layout="standard" />
      </div>
      <br />
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[2]} layout="classic" />
      </div>
    </div>
  )
})
