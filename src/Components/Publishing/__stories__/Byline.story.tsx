import { storiesOf } from "@storybook/react"
import { extend } from "lodash"
import React from "react"
import { Byline } from "../Byline/Byline"
import { NewsByline } from "../Byline/NewsByline"
import { Share } from "../Byline/Share"
import { ShareDate } from "../Byline/ShareDate"
import { NewsArticle, StandardArticle } from "../Fixtures/Articles"
import { Authors } from "../Fixtures/Components"
import { EditableChild } from "../Fixtures/Helpers"
import { Authors as AuthorInfo } from "../Sections/Authors"

storiesOf("Publishing/Byline/Share", module)
  .add("Share", () => {
    return (
      <div>
        <Share
          url="http://artsy.net/article/point-pencils"
          title="The Point of Pencils"
        />
      </div>
    )
  })
  .add("With custom tracking", () => {
    const data = { entity_id: "1234", entity_type: "feature" }
    return (
      <div>
        <Share
          url="http://artsy.net/article/point-pencils"
          title="The Point of Pencils"
          trackingData={data}
        />
      </div>
    )
  })
  .add("With label", () => {
    return (
      <div>
        <Share
          url="http://artsy.net/article/point-pencils"
          title="The Point of Pencils"
          hasLabel
        />
      </div>
    )
  })
storiesOf("Publishing/Byline/Byline", module)
  .add("Byline", () => {
    return (
      <div>
        <Byline article={StandardArticle} />
      </div>
    )
  })
  .add("Many Authors", () => {
    const article = extend({}, StandardArticle, {
      authors: [
        { name: "Kana Abe" },
        { name: "Anna Louis-Sussman" },
        { name: "Halley Johnson" },
      ],
    })
    return (
      <div>
        <Byline article={article} />
      </div>
    )
  })
  .add("Condensed", () => {
    return (
      <div>
        <Byline article={StandardArticle} layout="condensed" />
      </div>
    )
  })
  .add("Custom color", () => {
    return (
      <div>
        <Byline article={StandardArticle} color="blue" />
      </div>
    )
  })
storiesOf("Publishing/Byline/ShareDate", module).add("Share Date", () => {
  return (
    <div>
      <ShareDate article={StandardArticle} />
    </div>
  )
})
storiesOf("Publishing/Byline/NewsByline", module)
  .add("Byline", () => {
    return (
      <div>
        <NewsByline article={NewsArticle} />
      </div>
    )
  })
  .add("Without source", () => {
    const article = Object.assign({}, NewsArticle)
    article.news_source = {}
    return (
      <div>
        <NewsByline article={article} />
      </div>
    )
  })
  .add("Editable DateSource", () => {
    const article = Object.assign({}, NewsArticle)
    return (
      <div>
        <NewsByline article={article} editSource={EditableChild("source")} />
      </div>
    )
  })

storiesOf("Publishing/Byline/AuthorInfo", module)
  .add("Multiple Authors", () => {
    return (
      <div style={{ margin: "20px" }}>
        <AuthorInfo authors={Authors} />
      </div>
    )
  })
  .add("Single Author", () => {
    const authors = [Authors[0]]
    return (
      <div style={{ margin: "20px" }}>
        <AuthorInfo authors={authors} />
      </div>
    )
  })
  .add("No Image", () => {
    const authors = [Authors[2]]
    return (
      <div style={{ margin: "20px" }}>
        <AuthorInfo authors={authors} />
      </div>
    )
  })
  .add("No Meta", () => {
    const authors = [Authors[3]]
    return (
      <div style={{ margin: "20px" }}>
        <AuthorInfo authors={authors} />
      </div>
    )
  })
