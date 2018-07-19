import { storiesOf } from "@storybook/react"
import { extend } from "lodash"
import React from "react"
import {
  ClassicArticle,
  ClassicArticleManyAuthors,
  FeatureArticle,
  MissingVerticalStandardArticle,
  StandardArticle,
} from "../Fixtures/Articles"
import { HeroSections } from "../Fixtures/Components"
import { EditableChild } from "../Fixtures/Helpers"
import { Header } from "../Header2/Header"

storiesOf("Publishing/Header2/Classic", module)
  .add("Classic", () => {
    return <Header article={ClassicArticle} />
  })
  .add("Many Authors", () => {
    return <Header article={ClassicArticleManyAuthors} />
  })
  .add("Editable", () => {
    return (
      <Header
        article={ClassicArticle}
        date="2015-06-19T13:09:18.567Z"
        editLeadParagraph={EditableChild("Lead Paragraph")}
        editTitle={EditableChild("Title")}
      />
    )
  })

storiesOf("Publishing/Header2/Standard", module)
  .add("Standard", () => {
    return <Header article={StandardArticle} />
  })
  .add("Missing Vertical", () => {
    return <Header article={MissingVerticalStandardArticle} />
  })
  .add("Editable", () => {
    return (
      <Header
        article={MissingVerticalStandardArticle}
        date="2015-06-19T13:09:18.567Z"
        editTitle={EditableChild("Title")}
        editVertical={EditableChild("Vertical")}
      />
    )
  })

storiesOf("Publishing/Header2/Feature/Text", module)
  .add("Image", () => {
    const article = extend({}, FeatureArticle, {
      hero_section: HeroSections[0],
    })
    return <Header article={article} />
  })
  .add("Video", () => {
    return <Header article={FeatureArticle} />
  })
  .add("Editable", () => {
    const article = extend({}, FeatureArticle, {
      vertical: null,
    })
    return (
      <Header
        article={article}
        date="2015-06-19T13:09:18.567Z"
        editDeck={EditableChild("Deck")}
        editImage={EditableChild("Image")}
        editTitle={EditableChild("Title")}
        editVertical={EditableChild("Vertical")}
      />
    )
  })
