import React from "react"
import { storiesOfPublishing } from "../../../__stories__/storiesOf.js"
import { ContextProvider } from "../../Artsy"
import { Article } from "../Article"
import {
  ImageHeavyStandardArticle,
  ShortStandardArticle,
  StandardArticle,
} from "../Fixtures/Articles"
import { RelatedCanvas, RelatedPanel } from "../Fixtures/Components"

storiesOfPublishing("Publishing/Read More", module).add("Text Article", () => {
  return (
    <ContextProvider>
      <Article
        article={StandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        isTruncated
      />
    </ContextProvider>
  )
})

storiesOfPublishing("Publishing/Read More", module).add(
  "Image Heavy Article",
  () => {
    return (
      <ContextProvider>
        <Article
          article={ImageHeavyStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
      </ContextProvider>
    )
  }
)

storiesOfPublishing("Publishing/Read More", module).add("Short Article", () => {
  return (
    <ContextProvider>
      <Article
        article={ShortStandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        isTruncated
      />
    </ContextProvider>
  )
})
