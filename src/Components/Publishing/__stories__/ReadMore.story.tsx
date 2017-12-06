import { storiesOf } from "@storybook/react"
import React from "react"
import { Article } from "../Article"
import { ImageHeavyStandardArticle, ShortStandardArticle, StandardArticle } from "../Fixtures/Articles"
import { RelatedCanvas, RelatedPanel } from "../Fixtures/Components"

storiesOf("Publishing/Read More", module).add("Text Article", () => {
  return (
    <Article
      article={StandardArticle}
      relatedArticlesForPanel={RelatedPanel}
      relatedArticlesForCanvas={RelatedCanvas}
      isTruncated
    />
  )
})

storiesOf("Publishing/Read More", module).add("Image Heavy Article", () => {
  return (
    <Article
      article={ImageHeavyStandardArticle}
      relatedArticlesForPanel={RelatedPanel}
      relatedArticlesForCanvas={RelatedCanvas}
      isTruncated
    />
  )
})

storiesOf("Publishing/Read More", module).add("Short Article", () => {
  return (
    <Article
      article={ShortStandardArticle}
      relatedArticlesForPanel={RelatedPanel}
      relatedArticlesForCanvas={RelatedCanvas}
      isTruncated
    />
  )
})
