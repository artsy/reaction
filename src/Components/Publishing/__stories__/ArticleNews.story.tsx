import { storiesOf } from "@storybook/react"
import {
  Display,
  RelatedCanvas,
} from "Components/Publishing/Fixtures/Components"
import React from "react"
import { Article } from "../Article"
import { NewsArticle } from "../Fixtures/Articles"

storiesOf("Publishing/Articles/News", module)
  .add("Expanded", () => {
    return <Article article={NewsArticle} />
  })
  .add("Collapsed", () => {
    return <Article article={NewsArticle} isTruncated />
  })
  .add("Has Related", () => {
    return (
      <Article
        article={NewsArticle}
        isTruncated
        relatedArticlesForCanvas={RelatedCanvas}
      />
    )
  })
  .add("Has Display", () => {
    return (
      <Article article={NewsArticle} isTruncated display={Display("video")} />
    )
  })
  .add("Related & Display", () => {
    return (
      <Article
        article={NewsArticle}
        isTruncated
        relatedArticlesForCanvas={RelatedCanvas}
        display={Display("image")}
      />
    )
  })
  .add("Mobile Collapsed", () => {
    return <Article article={NewsArticle} isTruncated isMobile />
  })
