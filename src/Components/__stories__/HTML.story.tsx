import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { HTML } from "Components/HTML"

storiesOf("Styleguide/Components", module).add("HTML", () => {
  return (
    <HTML
      style={{ border: "1px dotted" }}
      size="6"
      html={`
        <p>hello</p>
        <p>world</p>
      `}
    />
  )
})
