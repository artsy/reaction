import { storiesOf } from "@storybook/react"
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
  .add("Condensed Byline", () => {
    return (
      <div>
        <Byline article={StandardArticle} layout="condensed" />
      </div>
    )
  })
