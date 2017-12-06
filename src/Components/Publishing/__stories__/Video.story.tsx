import { storiesOf } from "@storybook/react"
import React from "react"
import { VideoArticle } from "../Fixtures/Articles"
import { VideoLayout } from "../Video/VideoLayout"

storiesOf("Publishing/Video", module)
  .add("Video Article", () => {
    return (
      <VideoLayout article={VideoArticle}/>
    )
  })
