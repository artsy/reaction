import { storiesOf } from "@storybook/react"
import React from "react"
import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
  VideoArticleSponsored
} from "../Fixtures/Articles"
import { Media } from "../Fixtures/Components"
import { VideoAbout } from "../Video/VideoAbout"
import { VideoCover } from "../Video/VideoCover"
import { VideoLayout } from "../Video/VideoLayout"

storiesOf("Publishing/Video", module)
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
  .add("Video Article", () => {
    return (
      <VideoLayout article={VideoArticle} />
    )
  })
  .add("Video Article - Series", () => {
    return (
      <VideoLayout
        article={VideoArticle}
        seriesArticle={SeriesArticle}
        relatedArticles={[StandardArticle,VideoArticle]}
      />
    )
  })
  .add("Video Article - Sponsored", () => {
    return (
      <VideoLayout
      article={VideoArticleSponsored}
      />
    )
  })
  .add("Video Article - Series + Sponsored", () => {
    return (
      <VideoLayout
        article={VideoArticleSponsored}
        seriesArticle={SeriesArticleSponsored}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })

