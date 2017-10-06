import { storiesOf } from "@storybook/react"
import * as React from "react"

import SelectableLink from "../selectable_link"

storiesOf("Onboarding", module).add("SelectableLink", () => {
  return (
    <div style={{ width: "400px" }}>
      <SelectableLink text="Buy Art & Design" onSelect={this.onSelect} />
    </div>
  )
})
