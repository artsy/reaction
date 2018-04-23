import { clone } from "lodash"
import { storiesOf } from "@storybook/react"
import React from "react"
import { ArticleCard } from "../RelatedArticles/ArticleCards/ArticleCard"
import { ArticleCards } from "../RelatedArticles/ArticleCards/ArticleCards"
import { ArticleCardsBlock } from "../RelatedArticles/ArticleCards/Block"
import { ArticleData } from "../Typings"

import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
  VideoArticleUnpublished,
} from "../Fixtures/Articles"
import { EditableChild } from "../Fixtures/Helpers"

storiesOf("Publishing/RelatedArticleCards", module)
  .add("Article Cards Block", () => {
    return (
      <div>
        <ArticleCardsBlock
          article={StandardArticle}
          relatedArticles={[StandardArticle, VideoArticle]}
        />
      </div>
    )
  })
  .add("Article Cards Block - Sponsored", () => {
    const article = clone({
      ...StandardArticle,
      seriesArticle: SeriesArticleSponsored,
    } as ArticleData)

    return (
      <div>
        <ArticleCardsBlock
          article={article}
          relatedArticles={[StandardArticle, VideoArticle]}
        />
      </div>
    )
  })
  .add("Article Cards", () => {
    return (
      <div>
        <ArticleCards
          series={SeriesArticle}
          relatedArticles={[StandardArticle, VideoArticle]}
        />
      </div>
    )
  })
  .add("Article Card", () => {
    return (
      <div>
        <ArticleCard article={StandardArticle} series={SeriesArticle} />
      </div>
    )
  })
  .add("Article Card: Media", () => {
    return (
      <div>
        <ArticleCard article={VideoArticle} series={SeriesArticle} />
      </div>
    )
  })
  .add("Article Card: Media Unpublished", () => {
    return (
      <div>
        <ArticleCard article={VideoArticleUnpublished} series={SeriesArticle} />
      </div>
    )
  })
  .add("Article Card with children", () => {
    return (
      <div>
        <ArticleCard
          article={StandardArticle}
          series={SeriesArticle}
          editDate={EditableChild("date")}
          editDescription={EditableChild("description")}
          editImage={EditableChild("image")}
          editTitle={EditableChild("title")}
        />
      </div>
    )
  })
