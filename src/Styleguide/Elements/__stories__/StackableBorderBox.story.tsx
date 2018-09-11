import { Flex, StackableBorderBox } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("StackableBorderBox", () => {
  return (
    <>
      <Section title="StackableBorderBox">
        <StackableBorderBox>
          A StackableBorderBox component is a component that has a border and
          contains content
        </StackableBorderBox>
      </Section>

      <Section title="StackableBorderBox with siblings">
        <Flex flexDirection="column">
          <StackableBorderBox>
            A StackableBorderBox component can have siblings that share borders.
          </StackableBorderBox>
          <StackableBorderBox>Like this box</StackableBorderBox>
          <StackableBorderBox>And this box</StackableBorderBox>
        </Flex>
      </Section>
    </>
  )
})
