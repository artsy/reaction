import { storiesOf } from "@storybook/react"
import React from "react"
import { ArticleCard } from '../Series/Components/ArticleCard'
import { SeriesAbout } from '../Series/Components/SeriesAbout'
import { SeriesTitle } from '../Series/Components/SeriesTitle'

import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle
} from "../Fixtures/Articles"

storiesOf("Publishing/Series", module).add("Article Card", () => {
  return (
    <div>
      <ArticleCard
        article={StandardArticle}
        series={SeriesArticle}
      />
    </div>
  )
}).add("Article Card: Video", () => {
  return (
    <div>
      <ArticleCard
        article={VideoArticle}
        series={SeriesArticle}
      />
    </div>
  )
}).add("Series Title", () => {
  return (
    <div>
      <SeriesTitle series={SeriesArticle} />
    </div>
  )
}).add("Series Title: Sponsored", () => {
  return (
    <div>
      <SeriesTitle series={SeriesArticleSponsored} />
    </div>
  )
}).add("Series About", () => {
  return (
    <div>
      <SeriesAbout series={SeriesArticle} />
    </div>
  )
}).add("Series About: Sponsored", () => {
  return (
    <div>
      <SeriesAbout series={SeriesArticleSponsored} />
    </div>
  )
})
