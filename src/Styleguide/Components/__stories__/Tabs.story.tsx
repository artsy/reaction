import React from "react"
import { Sans } from "@artsy/palette"
import { Flex } from "Styleguide/Elements/Flex"
import { Section } from "Styleguide/Utils/Section"
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
      <Section title="With renderProps and onChange handler">
        <Tabs
          activeTabIndex={1}
          labels={["Hello", "How", "Are", "You?"]}
          onChange={activeTab => {
            // tslint:disable-next-line
            console.log(activeTab)
          }}
        >
          {({ activeTab }) => {
            return (
              <Flex flexDirection="column" py={3}>
                <Sans size="4" weight="medium">
                  ActiveTab:
                </Sans>
                <Sans size="3">{activeTab.label}</Sans>
              </Flex>
            )
          }}
        </Tabs>
      </Section>
    </React.Fragment>
  )
})
