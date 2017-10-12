import { storiesOf } from "@storybook/react"
import * as React from "react"
import Article from "../Article"
import {
  FeatureArticle,
  MissingVerticalStandardArticle,
  ShortStandardArticle,
  StandardArticle,
} from "../Fixtures/Articles"
import { Display, RelatedCanvas, RelatedPanel } from "../Fixtures/Components"

const story = storiesOf("Publishing/Articles", module).add("Standard", () => {
  return (
    <Article
      article={StandardArticle}
      relatedArticlesForPanel={RelatedPanel}
      relatedArticlesForCanvas={RelatedCanvas}
      emailSignupUrl="#"
    />
  )
})
;["overlay", "image", "video", "slideshow"].forEach(type => {
  story.add(`Standard with ${type} ad`, () => {
    return (
      <Article
        article={StandardArticle}
        display={Display(type)}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
      />
    )
  })
})

story
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
