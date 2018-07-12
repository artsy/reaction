import { storiesOf } from "@storybook/react"
import _ from "lodash"
import React from "react"

import { HeroSections } from "../Fixtures/Components"
import { Header } from "../Header/Header"

import {
  BasicArticle,
  ClassicArticle,
  FeatureArticle,
  MissingVerticalStandardArticle,
  StandardArticle,
  SuperArticle,
} from "../Fixtures/Articles"

storiesOf("Legacy/Publishing/Header/Classic", module)
  .add("Classic", () => {
    return (
      <div style={{ width: "100%", height: "400px", position: "relative" }}>
        <Header article={ClassicArticle} />
      </div>
    )
  })
  .add("With children", () => {
    return (
      <div style={{ width: "100%", height: "400px", position: "relative" }}>
        <Header article={ClassicArticle}>
          <div>Child 0: Title</div>
          <p>Child 1: Lead Paragraph</p>
        </Header>
      </div>
    )
  })

storiesOf("Legacy/Publishing/Header/Standard", module)
  .add("Standard", () => {
    return (
      <div style={{ width: "100%", height: "400px", position: "relative" }}>
        <Header article={StandardArticle} />
      </div>
    )
  })
  .add("With Children", () => {
    return (
      <div style={{ width: "100%", height: "400px", position: "relative" }}>
        <Header article={MissingVerticalStandardArticle}>
          <div>Child 0: Vertical</div>
          <div>Child 1: Title</div>
        </Header>
      </div>
    )
  })

storiesOf("Legacy/Publishing/Header/Feature/Basic", module)
  .add("Basic", () => {
    const article = _.clone(BasicArticle)
    article.hero_section.url = null

    return (
      <div>
        <div style={{ width: "100%", position: "relative" }}>
          <Header article={BasicArticle} />
        </div>
      </div>
    )
  })
  .add("With Embed", () => {
    const article = _.clone(BasicArticle)
    article.hero_section.url = "https://vimeo.com/238843720"

    return (
      <div>
        <div style={{ width: "100%", position: "relative" }}>
          <Header article={BasicArticle} />
        </div>
      </div>
    )
  })
storiesOf("Legacy/Publishing/Header/Feature/Text", module)
  .add("With Image", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[0],
    })
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("With Video", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[5],
    })
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("With children", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[5],
    })
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header article={article}>
          <div>Child 0: Vertical</div>
          <div>Child 1: Title</div>
          <div>Child 2: Deck</div>
          <div>Child 3: Image</div>
        </Header>
      </div>
    )
  })
storiesOf("Legacy/Publishing/Header/Feature/Split", module)
  .add("With Image", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[1],
    })
    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("With Video", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[3],
    })
    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("With children", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[3],
    })
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header article={article}>
          <div>Child 0: Vertical</div>
          <div>Child 1: Title</div>
          <div>Child 2: Deck</div>
          <div>Child 3: Image</div>
        </Header>
      </div>
    )
  })
storiesOf("Legacy/Publishing/Header/Feature/Fullscreen", module)
  .add("With Image", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[2],
    })
    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("With Video", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[4],
    })
    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("With Children", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[4],
    })
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header article={article}>
          <div>Child 0: Vertical</div>
          <div>Child 1: Title</div>
          <div>Child 2: Deck</div>
          <div>Child 3: Image</div>
        </Header>
      </div>
    )
  })
  .add("Super Article", () => {
    const article = _.extend({}, SuperArticle, {
      hero_section: HeroSections[2],
    })

    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
