import { storiesOf } from "@storybook/react"
import React from "react"
import { FeatureArticle, NewsArticle } from "../Fixtures/Articles"
import { EditableChild } from "../Fixtures/Helpers"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsPanel } from "../News/NewsPanel"

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
  .add("News Panel", () => {
    return (
      <div>
        <NewsPanel articles={[NewsArticle, FeatureArticle]} />
      </div>
    )
  })
