import { storiesOf } from "@storybook/react"
import * as React from "react"
import { RelatedCanvas, RelatedPanel } from "../Fixtures/Components"
import { RelatedArticlesCanvas } from "../RelatedArticles/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "../RelatedArticles/RelatedArticlesPanel"

storiesOf("Publishing/Related Articles", module)
  .add("Related Articles Panel", () => {
    return <RelatedArticlesPanel articles={RelatedPanel} />
  })
  .add("Related Articles Canvas", () => {
    return (
      <RelatedArticlesCanvas
        articles={RelatedCanvas}
        vertical={{
          name: "Market Analysis",
          id: "123"
        }}
      />
    )
  })
