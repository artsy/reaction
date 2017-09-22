import { storiesOf } from "@storybook/react"
import * as React from "react"
import Article from "../article"
import { ImageHeavyStandardArticle, ShortStandardArticle, StandardArticle } from "../fixtures/articles"
import { RelatedCanvas, RelatedPanel } from "../fixtures/components"

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
