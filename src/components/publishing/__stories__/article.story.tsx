import { storiesOf } from "@storybook/react"
import * as React from "react"

import Articles from "../__test__/fixtures/articles"
import Article from "../article"

storiesOf("Publishing/Articles", module)
  .add("Standard", () => {
    return <Article article={Articles[1]} />
  })
  .add("Feature", () => {
    return <Article article={Articles[2]} />
  })
