import { storiesOf } from "@storybook/react"
import * as React from "react"
import { RelatedCanvas, RelatedPanel } from "../fixtures/components"
import RelatedArticlesCanvas from "../related_articles/related_articles_canvas"
import RelatedArticlesPanel from "../related_articles/related_articles_panel"

storiesOf("Publishing/Related Articles", module)
  .add("Related Articles Panel", () => {
    return <RelatedArticlesPanel articles={RelatedPanel} />
  })
  .add("Related Articles Canvas", () => {
    return <RelatedArticlesCanvas articles={RelatedCanvas} vertical={{ name: "Market Analysis", id: "123" }} />
  })
