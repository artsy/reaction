import { storiesOf } from "@storybook/react"
import React from "react"
import { EditableChild } from "../Fixtures/Helpers"
import { Header } from "../Header2/Header"

import { ClassicArticle, ClassicArticleManyAuthors } from "../Fixtures/Articles"

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
        editLeadParagraph={EditableChild("Lead Paragraph")}
        editTitle={EditableChild("Title")}
      />
    )
  })
