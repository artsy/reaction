import { storiesOf } from "@storybook/react"
import * as React from "react"

import Article from "../article"
import Articles from "../fixtures/articles"

storiesOf("Publishing/Articles", module)
  .add("Standard", () => {
    return <Article article={Articles[1]} />
  })
  .add("Feature", () => {
    return <Article article={Articles[2]} />
  })
