import { storiesOf } from "@storybook/react"
import React from "react"
import { Authors, Embeds } from "../Fixtures/Components"
import { Videos } from "../Fixtures/Components"
import { Authors as AuthorInfo } from "../Sections/Authors"
import { Embed } from "../Sections/Embed"
import { Video } from "../Sections/Video"

storiesOf("Publishing/Sections", module)
  .add("Embed", () => {
    return (
      <div style={{ width: "100%" }}>
        <Embed section={Embeds[0]} />
      </div>
    )
  })
  .add("Author Info", () => {
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <AuthorInfo authors={Authors} />
      </div>
    )
  })
  .add("Video - Youtube", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[0]} layout="standard" />
      </div>
    )
  })
  .add("Video - Vimeo", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[1]} layout="standard" />
      </div>
    )
  })
  .add("Video - Coverless", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[2]} layout="classic" />
      </div>
    )
  })
  .add("Video - with custom tracking data", () => {
    const data = { entity_id: "1234", entity_type: "feature" }
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[0]} layout="standard" trackingData={data} />
      </div>
    )
  })
