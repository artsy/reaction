import { storiesOf } from "@storybook/react"
import { Article } from "Components/Publishing/Article"
import React from "react"
import styled from "styled-components"

import {
  ImageHeavyStandardArticle,
  MissingVerticalStandardArticle,
  StandardArticle,
} from "../Fixtures/Articles"

import { ContextProvider } from "../../Artsy"
import { Display, RelatedCanvas, RelatedPanel } from "../Fixtures/Components"
import { ArticleData } from "../Typings"

const story = storiesOf("Publishing/Articles/Standard", module)
  .add("Standard", () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          emailSignupUrl="#"
        />
      </ContextProvider>
    )
  })
  .add("Without Vertical", () => {
    return (
      <ContextProvider>
        <Article
          article={MissingVerticalStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          emailSignupUrl="#"
        />
      </ContextProvider>
    )
  })
  .add("With top margin", () => {
    return (
      <ContextProvider>
        <Article
          article={ImageHeavyStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          emailSignupUrl="#"
          marginTop="100px"
        />
      </ContextProvider>
    )
  })
  .add("Truncated", () => {
    return (
      <ContextProvider>
        <Article
          article={ImageHeavyStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          emailSignupUrl="#"
          isTruncated
        />
      </ContextProvider>
    )
  })
  .add("With tooltips (bio)", () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          emailSignupUrl="#"
          showTooltips
        />
      </ContextProvider>
    )
  })
  .add("With tooltips (data)", () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          emailSignupUrl="#"
          showTooltips
          showToolTipMarketData
        />
      </ContextProvider>
    )
  })

const displays = ["overlay", "image", "video", "slideshow"]
displays.forEach(displayType => {
  story.add(`With ${displayType} ad`, () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          display={Display(displayType)}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          emailSignupUrl="#"
        />
      </ContextProvider>
    )
  })
})

story.add(`Multiple articles`, () => {
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
      <ContextProvider>
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
      </ContextProvider>
    </div>
  )
})

const Break = styled.div`
  border-top: 1px solid #ccc;
  width: 100%;
  margin-top: 80px;
`
