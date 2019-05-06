import { storiesOf } from "@storybook/react"
import { Article } from "Components/Publishing/Article"
import { clone, extend } from "lodash"
import React from "react"

import {
  BasicArticle,
  ImageHeavyStandardArticle,
  MissingVerticalStandardArticle,
  SeriesArticle,
  StandardArticle,
  SuperArticle,
} from "../Fixtures/Articles"

import { SystemContextProvider } from "Artsy"
import {
  Display,
  HeroSections,
  RelatedCanvas,
  RelatedPanel,
} from "../Fixtures/Components"
import { ArticleData } from "../Typings"

const story = storiesOf("Publishing/Articles/Standard", module)
  .add("Standard", () => {
    return (
      <SystemContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </SystemContextProvider>
    )
  })
  .add("Super Article", () => {
    const article = extend({}, SuperArticle, { hero_section: HeroSections[2] })
    return (
      <SystemContextProvider>
        <Article
          article={article}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isSuper
        />
      </SystemContextProvider>
    )
  })
  .add("In series", () => {
    const article = clone({
      ...StandardArticle,
      seriesArticle: SeriesArticle,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return (
      <SystemContextProvider>
        <Article article={article} />
      </SystemContextProvider>
    )
  })
  .add("Without Vertical", () => {
    return (
      <SystemContextProvider>
        <Article
          article={MissingVerticalStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </SystemContextProvider>
    )
  })
  .add("Truncated", () => {
    return (
      <SystemContextProvider>
        <Article
          article={ImageHeavyStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
      </SystemContextProvider>
    )
  })
  .add("With tooltips", () => {
    return (
      <SystemContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          showTooltips
        />
      </SystemContextProvider>
    )
  })

const displays = ["overlay", "image", "video", "slideshow"]
displays.forEach(displayType => {
  story.add(`With ${displayType} ad`, () => {
    return (
      <SystemContextProvider>
        <Article
          article={StandardArticle}
          display={Display(displayType)}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </SystemContextProvider>
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
    <SystemContextProvider>
      <div>
        <Article
          article={article}
          display={Display("slideshow")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          showCollectionsRail
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
    </SystemContextProvider>
  )
})
