import { storiesOf } from "@storybook/react"
import React from "react"
import { VideoPlayer } from "../VideoPlayer/VideoPlayer"

storiesOf("Publishing/Video Player", module)
  .add("Video Player", () => {
    return (
      <div style={{ width: "800px", height: "600px" }}>
        <VideoPlayer
          url="http://files.artsy.net/videos/placeholder.mp4"
          title="Trevor Paglan"
        />
      </div>
    )
  })
