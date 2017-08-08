import { storiesOf } from "@storybook/react"
import * as React from "react"

import { Text } from "../__test__/fixtures/components"
import TextContainer from "../sections/text_container"

storiesOf("Publishing/Text", module)
  .add("Classic", () => {
    return (
      <div style={{ width: 580, margin: "0 auto" }}>
        <TextContainer layout="classic" html={Text.classic} />
      </div>
    )
  })
  .add("Feature", () => {
    return (
      <div style={{ width: 680, margin: "0 auto" }}>
        <TextContainer layout="feature" html={Text.feature} />
      </div>
    )
  })
  .add("Standard", () => {
    return (
      <div style={{ width: 680, margin: "0 auto" }}>
        <TextContainer layout="standard" html={Text.standard} />
      </div>
    )
  })
