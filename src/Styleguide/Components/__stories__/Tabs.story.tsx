import { Box } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Sup, Tab, Tabs } from "../Tabs"

storiesOf("Styleguide/Components", module).add("Tabs (Simple)", () => {
  return (
    <>
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
        <Tabs justifyContent="center" separator={<Box mx={1}>♞</Box>}>
          <Tab name="About" />
          <Tab name="Pricing" />
          <Tab name="Condition" />
        </Tabs>
      </Section>
      <Section title="With superscript">
        <Tabs justifyContent="center">
          <Tab
            name={
              <>
                Open<Sup>100</Sup>
              </>
            }
          />
          <Tab
            name={
              <>
                Ready to ship<Sup>4</Sup>
              </>
            }
          />
          <Tab
            name={
              <>
                Complete<Sup />
                {/* empty sup to get vertical alignment right */}
              </>
            }
          />
        </Tabs>
      </Section>
      <Section title="Supports empty(null) tabs by ignoring them">
        <Tabs>
          {null}
          <Tab name="Pricing" />
          {null}
        </Tabs>
      </Section>
    </>
  )
})
