import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Box } from "Styleguide/Elements/Box"
import { Section } from "Styleguide/Utils/Section"
import { Tab, Tabs } from "../Tabs"

storiesOf("Styleguide/Components", module).add("Tabs (Simple)", () => {
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
      <Section title="Renders content">
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
      <Section title="With arbitrary data and onChange handler">
        <Tabs
          onChange={activeTab => {
            // tslint:disable-next-line
            console.log(activeTab.data)
          }}
        >
          <Tab data={{ target: "#about" }} name="About" />
          <Tab data={{ target: "#pricing" }} name="Pricing" />
          <Tab data={{ target: "#condition" }} name="Condition" />
        </Tabs>
      </Section>
      <Section title="With custom justification">
        <Tabs justifyContent="center">
          <Tab name="About" />
          <Tab name="Pricing" />
          <Tab name="Condition" />
        </Tabs>
      </Section>
      <Section title="With separator">
        <Tabs justifyContent="center" separator={<Box pr={"20px"}>*</Box>}>
          <Tab name="About" />
          <Tab name="Pricing" />
          <Tab name="Condition" />
        </Tabs>
      </Section>
    </React.Fragment>
  )
})
