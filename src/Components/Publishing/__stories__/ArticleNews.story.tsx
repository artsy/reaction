import { storiesOf } from "@storybook/react"
import React from "react"
import { Article } from "../Article"

import { NewsArticle } from "../Fixtures/Articles"

storiesOf("Legacy/Publishing/Articles/News", module)
  .add("Expanded", () => {
    return <Article article={NewsArticle} />
  })
  .add("Collapsed", () => {
    return <Article article={NewsArticle} isTruncated />
  })
  .add("Mobile Collapsed", () => {
    return <Article article={NewsArticle} isTruncated isMobile />
  })
