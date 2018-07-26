import { storiesOf } from "@storybook/react"
import { Article } from "Components/Publishing/Article"
import React from "react"

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
          isTruncated
        />
      </ContextProvider>
    )
  })
  .add("With tooltips", () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          showTooltips
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
    <ContextProvider>
      <div>
        <Article
          article={article}
          display={Display("slideshow")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
        <Article
          article={article}
          display={Display("video")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
        <Article
          article={article}
          display={Display("image")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
      </div>
    </ContextProvider>
  )
})
