import { storiesOf } from "@storybook/react"
import React from "react"

import { Videos } from "../Fixtures/Components"
import { Video } from "../Sections/Video"

storiesOf("Publishing/Video", module)
  .add("Youtube Video", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[0]} layout="standard" />
      </div>
    )
  })
  .add("Vimeo Video", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[1]} layout="standard" />
      </div>
    )
  })
  .add("Coverless Video", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[2]} layout="classic" />
      </div>
    )
  })
  .add("Video with custom tracking data", () => {
    const data = { entity_id: "1234", entity_type: "feature" }
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[0]} layout="standard" trackingData={data} />
      </div>
    )
  })