import { storiesOf } from "@storybook/react"
import * as React from "react"
import Article from "../article"
import {
  FeatureArticle,
  MissingVerticalStandardArticle,
  ShortStandardArticle,
  StandardArticle,
} from "../fixtures/articles"
import { RelatedCanvas, RelatedPanel } from "../fixtures/components"

storiesOf("Publishing/Articles", module)
  .add("Standard", () => {
    return (
      <Article
        article={StandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
      />
    )
  })
  .add("Standard without Vertical", () => {
    return (
      <Article
        article={MissingVerticalStandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
      />
    )
  })
  .add("Standard with top margin", () => {
    return (
      <Article
        article={ShortStandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
        marginTop={100}
      />
    )
  })
  .add("Feature", () => {
    return <Article article={FeatureArticle} />
  })
