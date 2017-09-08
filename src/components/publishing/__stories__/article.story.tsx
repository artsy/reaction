import { storiesOf } from "@storybook/react"
import * as React from "react"
import Article from "../article"
import { FeatureArticle, StandardArticle } from "../fixtures/articles"
import { RelatedPanel } from "../fixtures/components"

storiesOf("Publishing/Articles", module)
  .add("Standard", () => {
    return <Article article={StandardArticle} relatedArticles={RelatedPanel} />
  })
  .add("Feature", () => {
    return <Article article={FeatureArticle} />
  })
