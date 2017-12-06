import { storiesOf } from "@storybook/react"
import React from "react"
import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
  VideoArticleSponsored
} from "../Fixtures/Articles"
import { VideoLayout } from "../Video/VideoLayout"

storiesOf("Publishing/Video", module)
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
