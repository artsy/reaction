import { storiesOf } from "@storybook/react"
import React from "react"
import { VideoCard } from '../Series/VideoCard'

import {
  SeriesArticle,
  VideoArticle
} from "../Fixtures/Articles"

storiesOf("Series", module).add("Video Card", () => {
  return (
    <div>
      <VideoCard
        article={VideoArticle}
        series={SeriesArticle}
      />
    </div>
  )
})
