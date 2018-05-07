import { storiesOf } from "@storybook/react"
import React from "react"
import styled from "styled-components"
import { Article } from "../Article"

import {
  ImageHeavyStandardArticle,
  MissingVerticalStandardArticle,
  StandardArticle,
} from "../Fixtures/Articles"

import { Display, RelatedCanvas, RelatedPanel } from "../Fixtures/Components"
import { ArticleData } from "../Typings"

const story = storiesOf("Publishing/Standard Articles", module)
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
        article={ImageHeavyStandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
        marginTop="100px"
      />
    )
  })
  .add("Standard truncated", () => {
    return (
      <Article
        article={ImageHeavyStandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
        isTruncated
      />
    )
  })
  .add("Standard with tooltips", () => {
    return (
      <Article
        article={StandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
        showTooltips
      />
    )
  })

const displays = ["overlay", "image", "video", "slideshow"]
displays.forEach(displayType => {
  story.add(`Standard with ${displayType} ad`, () => {
    return (
      <Article
        article={StandardArticle}
        display={Display(displayType)}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
      />
    )
  })
})

story.add(`Multiple standard articles`, () => {
  const article: ArticleData = {
    ...StandardArticle,
    sections: [
      {
        type: "text",
        body: "<p>What would Antoine Court?</p>",
      },
    ],
  }

  return (
    <div>
      <Article
        article={article}
        display={Display("slideshow")}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
      />
      <Break />
      <Article
        article={article}
        display={Display("video")}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
      />
      <Break />
      <Article
        article={article}
        display={Display("image")}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
      />
    </div>
  )
})

const Break = styled.div`
  border-top: 1px solid #ccc;
  width: 100%;
  margin-top: 80px;
`
