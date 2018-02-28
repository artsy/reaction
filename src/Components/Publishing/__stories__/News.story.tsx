import { storiesOf } from "@storybook/react"
import React from "react"
import { NewsHeadline } from "../News/NewsHeadline"

import { NewsArticle } from "../Fixtures/Articles"
import { EditableChild } from "../Fixtures/Helpers"

storiesOf("Publishing/News", module)
  .add("News Headline", () => {
    return (
      <div>
        <NewsHeadline article={NewsArticle} />
      </div>
    )
  })
  .add("News Headline with children", () => {
    return (
      <div>
        <NewsHeadline
          article={NewsArticle}
          editTitle={EditableChild("title")}
        />
      </div>
    )
  })
