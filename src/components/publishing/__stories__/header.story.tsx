import { storiesOf } from "@storybook/react"
import * as _ from "lodash"
import * as React from "react"

import Header from "../header/header"

import Articles from "../__test__/fixtures/articles"
import { HeroSections } from "../__test__/fixtures/components"

storiesOf("Publishing/Headers", module)
  .add("Standard Header", () => {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Header article={Articles[1]} />
      </div>
    )
  })
  .add("Feature Header - Text", () => {
    const article = _.extend({}, Articles[2], { hero_section: HeroSections[0] })
    const article2 = _.extend({}, Articles[2], { hero_section: HeroSections[5] })
    return (
      <div>
        <div style={{ width: "100vw", position: "relative" }}>
          <Header article={article} />
        </div>
        <div style={{ width: "100vw", position: "relative" }}>
          <Header article={article2} />
        </div>
      </div>
    )
  })
  .add("Feature Header - Split", () => {
    const article = _.extend({}, Articles[2], { hero_section: HeroSections[1] })
    const article2 = _.extend({}, Articles[2], { hero_section: HeroSections[3] })
    return (
      <div>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <Header article={article} />
        </div>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <Header article={article2} />
        </div>
      </div>
    )
  })
  .add("Feature Header - Full", () => {
    const article = _.extend({}, Articles[2], { hero_section: HeroSections[2] })
    const article2 = _.extend({}, Articles[2], { hero_section: HeroSections[4] })
    return (
      <div>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <Header article={article} />
        </div>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <Header article={article2} />
        </div>
      </div>
    )
  })
