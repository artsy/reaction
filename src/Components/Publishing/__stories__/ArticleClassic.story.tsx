import { storiesOf } from "@storybook/react"
import React from "react"
import { Article } from "../Article"
import { ClassicArticle } from "../Fixtures/Articles"

storiesOf("Publishing/Articles/Classic", module).add("Classic", () => {
  return <Article article={ClassicArticle} />
})
