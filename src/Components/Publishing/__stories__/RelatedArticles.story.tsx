import { storiesOf } from "@storybook/react"
import React from "react"
import { RelatedCanvas, RelatedPanel } from "../Fixtures/Components"
import { RelatedArticlesCanvas } from "../RelatedArticles/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "../RelatedArticles/RelatedArticlesPanel"

storiesOf("Legacy/Publishing/Related Articles/Canvas", module)
  .add("With vertical", () => {
    return (
      <RelatedArticlesCanvas
        articles={RelatedCanvas}
        vertical={{
          name: "Market Analysis",
          id: "123",
        }}
      />
    )
  })
  .add("Without vertical", () => {
    return <RelatedArticlesCanvas articles={RelatedCanvas} />
  })

storiesOf("Legacy/Publishing/Related Articles/Panel", module).add("Panel", () => {
  return <RelatedArticlesPanel articles={RelatedPanel} />
})
