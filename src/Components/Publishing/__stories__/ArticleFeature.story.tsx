import { storiesOf } from "@storybook/react"
import { ContextProvider } from "Components/Artsy"
import { Article } from "Components/Publishing/Article"
import {
  BasicArticle,
  FeatureArticle,
  SeriesArticle,
  SeriesArticleSponsored,
  SuperArticle,
} from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  HeroSections,
  RelatedCanvas,
} from "Components/Publishing/Fixtures/Components"
import { ArticleData } from "Components/Publishing/Typings"
import { clone, extend } from "lodash"
import React from "react"

const story = storiesOf("Publishing/Articles/Feature", module)

story
  .add("Fullscreen", () => {
    return (
      <ContextProvider>
        <Article
          article={FeatureArticle}
          display={Display("image")}
          relatedArticlesForCanvas={RelatedCanvas}
          showTooltips
        />
      </ContextProvider>
    )
  })
  .add("In series", () => {
    const article = clone({
      ...FeatureArticle,
      seriesArticle: SeriesArticle,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return (
      <ContextProvider>
        <Article article={article} showTooltips />
      </ContextProvider>
    )
  })
  .add("In sponsored series", () => {
    const article = clone({
      ...FeatureArticle,
      seriesArticle: SeriesArticleSponsored,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return (
      <ContextProvider>
        <Article article={article} showTooltips />
      </ContextProvider>
    )
  })
  .add("Text", () => {
    const article = clone({
      ...FeatureArticle,
      hero_section: {
        type: "text",
        url: FeatureArticle.hero_section.url,
      },
    } as ArticleData)

    return (
      <ContextProvider>
        <Article article={article} showTooltips />
      </ContextProvider>
    )
  })
  .add("Split", () => {
    const article = clone({
      ...FeatureArticle,
      hero_section: {
        type: "split",
        url: FeatureArticle.hero_section.url,
      },
    } as ArticleData)

    return (
      <ContextProvider>
        <Article article={article} showTooltips />
      </ContextProvider>
    )
  })
  .add("Basic", () => {
    const article = clone({
      ...BasicArticle,
      sections: [
        {
          type: "text",
          body:
            "<p>The Black Power Tarot was conceived by musician King Khan in consultation with Alejandro Jodorowsky, and designed by illustrator Michael Eaton in 2015. The deck celebrates the strength and achievements of Black musicians, artists, and activists while staying faithful to the imagery and composition of the classic Tarot de Marseilles.</p>",
        },
      ],
    } as ArticleData)

    return (
      <ContextProvider>
        <Article
          article={article}
          display={Display("image")}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
          showTooltips
        />
      </ContextProvider>
    )
  })
  .add("Super Article", () => {
    const article = extend({}, SuperArticle, { hero_section: HeroSections[2] })
    return (
      <ContextProvider>
        <Article
          article={article}
          isSuper
          relatedArticlesForCanvas={RelatedCanvas}
          showTooltips
        />
      </ContextProvider>
    )
  })
