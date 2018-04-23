import { clone } from "lodash"
import { storiesOf } from "@storybook/react"
import React from "react"
import { Article } from "../Article"
import { ArticleData } from "../Typings"

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
    const article = clone({
      ...VideoArticle,
      seriesArticle: SeriesArticle,
    } as ArticleData)

    return (
      <Article
        article={article}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
  .add("Video Article - Sponsored", () => {
    return <Article article={VideoArticleSponsored} />
  })
  .add("Video Article - Series + Sponsored", () => {
    const article = clone({
      ...VideoArticle,
      seriesArticle: SeriesArticleSponsored,
    } as ArticleData)

    return (
      <Article
        article={article}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
