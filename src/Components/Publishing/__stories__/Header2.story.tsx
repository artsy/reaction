import { storiesOf } from "@storybook/react"
import React from "react"
import { EditableChild } from "../Fixtures/Helpers"
import { Header } from "../Header2/Header"

import {
  ClassicArticle,
  ClassicArticleManyAuthors,
  MissingVerticalStandardArticle,
  StandardArticle,
} from "../Fixtures/Articles"

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
