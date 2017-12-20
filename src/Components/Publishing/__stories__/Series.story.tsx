import { storiesOf } from "@storybook/react"
import React from "react"
import { ArticleCard } from '../Series/ArticleCard'
import { SeriesAbout } from '../Series/SeriesAbout'
import { SeriesTitle } from '../Series/SeriesTitle'

import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
  VideoArticleUnpublished
} from "../Fixtures/Articles"
import { EditableChild } from '../Fixtures/Helpers'

storiesOf("Publishing/Series", module).add("Article Card", () => {
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
        article={VideoArticle}
        series={SeriesArticle}
      />
    </div>
  )
}).add("Article Card: Media Unpublished", () => {
  return (
    <div>
      <ArticleCard
        article={VideoArticleUnpublished}
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
        editDate={EditableChild('date')}
        editDescription={EditableChild('description')}
        editImage={EditableChild('image')}
        editTitle={EditableChild('title')}
      />
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
      <SeriesTitle
        article={SeriesArticle}
        editTitle={EditableChild('title')}
      />
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
}).add("Series About with children", () => {
  return (
    <div>
      <SeriesAbout
        article={SeriesArticle}
        editDescription={EditableChild('description')}
      />
    </div>
  )
})

