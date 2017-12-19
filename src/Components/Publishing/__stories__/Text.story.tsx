import { storiesOf } from "@storybook/react"
import React from "react"
import { SectionText } from "../Fixtures/Components"
import { Text } from "../Sections/Text"

storiesOf("Publishing/Text", module)
  .add("Classic", () => {
    return (
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <Text layout="classic" html={SectionText.classic} />
      </div>
    )
  })
  .add("Feature", () => {
    return (
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Text layout="feature" html={SectionText.feature} />
      </div>
    )
  })
  .add("Standard", () => {
    return (
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Text layout="standard" html={SectionText.standard} />
      </div>
    )
  })
