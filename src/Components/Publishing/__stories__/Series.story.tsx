import { storiesOf } from "@storybook/react"
import React from "react"
import { ArticleCard } from '../Series/ArticleCard'
import { Series } from '../Series/Series'
import { SeriesAbout } from '../Series/SeriesAbout'
import { SeriesTitle } from '../Series/SeriesTitle'

import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
  VideoArticleUnpublished
} from "../Fixtures/Articles"

storiesOf("Publishing/Series", module).add("Series", () => {
  return (
    <div>
      <Series article={SeriesArticle} />
    </div>
  )
}).add("Series: Sponsored", () => {
  return (
    <div>
      <Series article={SeriesArticleSponsored} />
    </div>
  )
}).add("Article Card", () => {
  return (
    <div>
      <ArticleCard
        article={StandardArticle}
        series={SeriesArticle}
      />
    </div>
  )
}).add("Article Card: Media", () => {
  return (
    <div>
      <ArticleCard
        article={VideoArticleUnpublished}
        series={SeriesArticle}
      />
    </div>
  )
}).add("Article Card: Media Unpublished", () => {
  return (
    <div>
      <ArticleCard
        article={VideoArticle}
        series={SeriesArticle}
      />
    </div>
  )
}).add("Article Card with children", () => {
  return (
    <div>
      <ArticleCard
        article={StandardArticle}
        series={SeriesArticle}
      >
        <div>Child 0: Title</div>
        <div>Child 1: Description</div>
        <div>Child 2: Image</div>
      </ArticleCard>
    </div>
  )
}).add("Series Title", () => {
  return (
    <div>
      <SeriesTitle article={SeriesArticle} />
    </div>
  )
}).add("Series Title: Sponsored", () => {
  return (
    <div>
      <SeriesTitle article={SeriesArticleSponsored} />
    </div>
  )
}).add("Series Title with Children", () => {
  return (
    <div>
      <SeriesTitle article={SeriesArticle}>
        <div>Child 0: Title</div>
      </SeriesTitle>
    </div>
  )
}).add("Series About", () => {
  return (
    <div>
      <SeriesAbout article={SeriesArticle} />
    </div>
  )
}).add("Series About: Sponsored", () => {
  return (
    <div>
      <SeriesAbout article={SeriesArticleSponsored} />
    </div>
  )
})
