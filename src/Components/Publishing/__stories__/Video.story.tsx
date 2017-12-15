import { storiesOf } from "@storybook/react"
import React from "react"
import {
  VideoArticle,
} from "../Fixtures/Articles"
import { Media } from "../Fixtures/Components"
import { VideoPlayer } from "../Video/Player/VideoPlayer"
import { VideoAbout } from "../Video/VideoAbout"
import { VideoCover } from "../Video/VideoCover"

storiesOf("Publishing/Video", module)
  .add("Video Player", () => {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <VideoPlayer {...Media[0]} />
      </div>
    )
  })
  .add("Video Cover", () => {
    return (
      <VideoCover
        media={Media[0]}
        description={VideoArticle.description}
      />
    )
  })
  .add("Video About", () => {
    return (
      <VideoAbout
        article={VideoArticle}
      />
    )
  })
