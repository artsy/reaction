import { storiesOf } from "@storybook/react"
import { clone } from 'lodash'
import React from "react"
import styled from 'styled-components'
import _ from "underscore"
import { Article } from "../Article"

import {
  BasicArticle,
  FeatureArticle,
  ImageHeavyStandardArticle,
  MissingVerticalStandardArticle,
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  SuperArticle,
  VideoArticle,
  VideoArticleSponsored
} from "../Fixtures/Articles"

import {
  Display,
  HeroSections,
  RelatedCanvas,
  RelatedPanel
} from "../Fixtures/Components"

const story = storiesOf("Publishing/Articles", module)
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
  const article = {
    ...StandardArticle,
    sections: [
      {
        type: "text",
        body:
        "<p>What would Antoine Court?</p>",
      }
    ]
  }
  return (
    <div>
      <Article
        article={article}
        display={Display('slideshow')}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
      />
      <Break />
      <Article
        article={article}
        display={Display('video')}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
      />
      <Break />
      <Article
        article={article}
        display={Display('image')}
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

story.add("Feature", () => {
  return <Article article={FeatureArticle} relatedArticlesForCanvas={RelatedCanvas} />
})
  .add("Basic Feature", () => {
    const article = clone({
      ...BasicArticle,
      sections: [
        {
          type: "text",
          body:
          "<p>The Black Power Tarot was conceived by musician King Khan in consultation with Alejandro Jodorowsky, and designed by illustrator Michael Eaton in 2015. The deck celebrates the strength and achievements of Black musicians, artists, and activists while staying faithful to the imagery and composition of the classic Tarot de Marseilles.</p>"
        }
      ]
    })

    return (
      <Article
        article={article}
        display={Display('image')}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        emailSignupUrl="#"
        isTruncated
      />
    )
  })
  .add("Super Article", () => {
    const article = _.extend({}, SuperArticle, { hero_section: HeroSections[2] })
    return <Article article={article} isSuper relatedArticlesForCanvas={RelatedCanvas} />
  })
  .add("Series", () => {
    return (
      <Article article={SeriesArticle} />
    )
  })
  .add("Series - Sponsored", () => {
    return (
      <Article article={SeriesArticleSponsored} />
    )
  })
  .add("Video Article", () => {
    return (
      <Article article={VideoArticle} />
    )
  })
  .add("Video Article - Series", () => {
    return (
      <Article
        article={VideoArticle}
        seriesArticle={SeriesArticle}
        relatedArticles={[StandardArticle,VideoArticle]}
      />
    )
  })
  .add("Video Article - Sponsored", () => {
    return (
      <Article
        article={VideoArticleSponsored}
      />
    )
  })
  .add("Video Article - Series + Sponsored", () => {
    return (
      <Article
        article={VideoArticleSponsored}
        seriesArticle={SeriesArticleSponsored}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })