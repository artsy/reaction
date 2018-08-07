import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { BorderBox } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("BorderBox", () => {
  return (
    <>
      <Section title="BorderBox">
        <BorderBox>
          A BorderBox component is a component that has a border and contains
          content
        </BorderBox>
      </Section>

      <Section title="BorderBox responsive padding">
        <BorderBox responsive>
          A BorderBox component can have responsive padding
        </BorderBox>
      </Section>

      <Section title="BorderBox with siblings">
        <Flex flexDirection="column">
          <BorderBox responsive hasSiblings>
            A BorderBox component can have siblings that share borders.
          </BorderBox>
          <BorderBox responsive hasSiblings>
            Like this box
          </BorderBox>
          <BorderBox responsive hasSiblings>
            And this box
          </BorderBox>
        </Flex>
      </Section>
    </>
  )
})
