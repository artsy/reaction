import moment from "moment-timezone"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Timer } from "../Timer"

storiesOf("Styleguide/Components", module).add("Timer", () => {
  return (
    <React.Fragment>
      <Section title="Timer (5 days from now)">
        <Timer endDate={moment().add(5, "days")} />
      </Section>

      <Section title="Timer (5 hours from now)">
        <Timer endDate={moment().add(5, "hours")} />
      </Section>

      <Section title="Timer (30 seconds from now)">
        <Timer endDate={moment().add(30, "seconds")} />
      </Section>

      <Section title="Timer (in the past)">
        <Timer endDate={moment().subtract(5, "days")} />
      </Section>
    </React.Fragment>
  )
})
