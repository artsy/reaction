import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Tab, Tabs } from "../Tabs"

storiesOf("Styleguide/Components", module).add("Tabs", () => {
  return (
    <React.Fragment>
      <Section title="Artist">
        <Tabs>
          <Tab name="Overview" />
          <Tab name="CV" />
          <Tab name="Shows" />
          <Tab name="Auction Results" />
          <Tab name="Articles" />
          <Tab name="Related Artists" />
        </Tabs>
      </Section>
      <Section title="Artwork">
        <Tabs initialTabIndex={1}>
          <Tab name="About the work" />
          <Tab name="Exhibition history" />
          <Tab name="Bibliography" />
        </Tabs>
      </Section>
      <Section title="With renderProps and onChange handler">
        <Tabs
          initialTabIndex={1}
          onChange={activeTab => {
            // tslint:disable-next-line
            console.log(activeTab)
          }}
        >
          <Tab name="Hello">Hello</Tab>
          <Tab name="How">How</Tab>
          <Tab name="Are">Are</Tab>
          <Tab name="You?">You?</Tab>
        </Tabs>
      </Section>
    </React.Fragment>
  )
})
