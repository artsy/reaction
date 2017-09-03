import { storiesOf } from "@storybook/react"
import * as React from "react"
import Article from "../article"
import { FeatureArticle, StandardArticle } from "../fixtures/articles"
import { Related } from "../fixtures/components"

storiesOf("Publishing/Articles", module)
  .add("Standard", () => {
    return <Article article={StandardArticle} relatedArticles={Related} />
  })
  .add("Feature", () => {
    return <Article article={FeatureArticle} />
  })
