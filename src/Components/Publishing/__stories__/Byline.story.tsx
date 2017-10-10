import { storiesOf } from "@storybook/react"
import { extend } from "lodash"
import * as React from "react"
import Byline from "../byline/byline"
import Share from "../byline/share"
import { StandardArticle } from "../fixtures/articles"

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
      contributing_authors: [{ name: "Kana Abe" }, { name: "Anna Louis-Sussman" }, { name: "Halley Johnson" }],
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
