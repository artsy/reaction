import { storiesOf } from "@storybook/react"
import React from "react"
import { NewsDateHeader } from "../News/NewsDateHeader"
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
  .add("News Date Header", () => {
    return (
      <div>
        <NewsDateHeader date={NewsArticle.published_at} />
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
