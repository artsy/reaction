import { storiesOf } from "@storybook/react"
import React from "react"
import { Article } from "../Article"

import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
  VideoArticleSponsored,
} from "../Fixtures/Articles"

storiesOf("Publishing/Video Articles", module)
  .add("Video Article", () => {
    return <Article article={VideoArticle} />
  })
  .add("Video Article - Series", () => {
    return (
      <Article
        article={VideoArticle}
        seriesArticle={SeriesArticle}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
  .add("Video Article - Sponsored", () => {
    return <Article article={VideoArticleSponsored} />
  })
  .add("Video Article - Series + Sponsored", () => {
    return (
      <Article
        article={VideoArticleSponsored}
        seriesArticle={SeriesArticleSponsored}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
