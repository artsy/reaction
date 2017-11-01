import { storiesOf } from "@storybook/react"
import { extend } from "lodash"
import React from "react"
import { Byline } from "../Byline/Byline"
import { Share } from "../Byline/Share"
import { StandardArticle } from "../Fixtures/Articles"

storiesOf("Publishing/Byline", module)
  .add("Share", () => {
    return (
      <div>
        <Share url="http://artsy.net/article/point-pencils" title="The Point of Pencils" />
      </div>
    )
  })
  .add("Full Byline", () => {
    return (
      <div>
        <Byline article={StandardArticle} />
      </div>
    )
  })
  .add("Many Authors Byline", () => {
    const article = extend({}, StandardArticle, {
      authors: [{ name: "Kana Abe" }, { name: "Anna Louis-Sussman" }, { name: "Halley Johnson" }],
    })
    return (
      <div>
        <Byline article={article} />
      </div>
    )
  })
  .add("Condensed Byline", () => {
    return (
      <div>
        <Byline article={StandardArticle} layout="condensed" />
      </div>
    )
  })
