import React from "react"
import { Section } from "../../Utils/Section"
import { Tabs } from "../Tabs"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Components", module).add("Tabs", () => {
  return (
    <React.Fragment>
      <Section title="Artist">
        <Tabs
          labels={[
            "Overview",
            "CV",
            "Shows",
            "Auction Results",
            "Articles",
            "Related Artists",
          ]}
        />
      </Section>
      <Section title="Artwork">
        <Tabs
          activeTabIndex={1}
          labels={["About the work", "Exhibition history", "Bibliography"]}
        />
      </Section>
    </React.Fragment>
  )
})
