import { storiesOf } from "@storybook/react"
import React from "react"
import { Article } from "../Article"

import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
} from "../Fixtures/Articles"

storiesOf("Publishing/Series Articles", module)
  .add("Series", () => {
    return (
      <Article
        article={SeriesArticle}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
  .add("Series - Sponsored", () => {
    return (
      <Article
        article={SeriesArticleSponsored}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
