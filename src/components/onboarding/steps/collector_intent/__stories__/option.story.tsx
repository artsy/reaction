import { storiesOf } from "@storybook/react"
import * as React from "react"
import Option from "../option"

storiesOf("Onboarding", module).add("Option", () => {
  return (
    <div style={{ width: "400px" }}>
      <Option href="#" text="Buy Art &amp; Design" onSelect={select => select} />
    </div>
  )
})
