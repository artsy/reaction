import { storiesOf } from "@storybook/react"
import { clone, extend } from "lodash"
import React from "react"
import { Article } from "../Article"

import {
  BasicArticle,
  FeatureArticle,
  SeriesArticle,
  SponsoredArticle,
  SuperArticle,
} from "../Fixtures/Articles"

import {
  Display,
  HeroSections,
  RelatedCanvas,
  RelatedPanel,
} from "../Fixtures/Components"
import { ArticleData } from "../Typings"

const story = storiesOf("Publishing/Articles/Feature", module)

story
  .add("Fullscreen", () => {
    return (
      <Article
        article={FeatureArticle}
        relatedArticlesForCanvas={RelatedCanvas}
      />
    )
  })
  .add("Fullscreen Series", () => {
    const article = clone({
      ...SponsoredArticle,
      seriesArticle: SeriesArticle,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return <Article article={article} />
  })
  .add("Split", () => {
    const article = clone({
      ...FeatureArticle,
      hero_section: {
        type: "split",
        url: FeatureArticle.hero_section.url,
      },
    } as ArticleData)

    return <Article article={article} />
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
      <Article
        article={article}
        display={Display("image")}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
        isTruncated
      />
    )
  })
  .add("Super Article", () => {
    const article = extend({}, SuperArticle, { hero_section: HeroSections[2] })
    return (
      <Article
        article={article}
        isSuper
        relatedArticlesForCanvas={RelatedCanvas}
      />
    )
  })
