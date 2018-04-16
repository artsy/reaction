import { storiesOf } from "@storybook/react"
import React from "react"
import { Article } from "../Article"

import { NewsArticle } from "../Fixtures/Articles"

storiesOf("Publishing/News Articles", module)
  .add("News Article", () => {
    return <Article article={NewsArticle} />
  })
  .add("News Article - Collapsed", () => {
    return <Article article={NewsArticle} isTruncated />
  })
  .add("News Article - Mobile Collapsed", () => {
    return <Article article={NewsArticle} isTruncated isMobile />
  })
