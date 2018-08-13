import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Flex } from "Styleguide/Elements/Flex"
import { StackableResponsiveBorderBox } from "Styleguide/Elements/StackableResponsiveBorderBox"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add(
  "StackableResponsiveBorderBox",
  () => {
    return (
      <>
        <Section title="StackableResponsiveBorderBox">
          <StackableResponsiveBorderBox>
            A StackableResponsiveBorderBox component is a component that has a
            border and contains content
          </StackableResponsiveBorderBox>
        </Section>

        <Section title="StackableResponsiveBorderBox with siblings">
          <Flex flexDirection="column">
            <StackableResponsiveBorderBox>
              A StackableResponsiveBorderBox component can have siblings that
              share borders.
            </StackableResponsiveBorderBox>
            <StackableResponsiveBorderBox>
              Like this box
            </StackableResponsiveBorderBox>
            <StackableResponsiveBorderBox>
              And this box
            </StackableResponsiveBorderBox>
          </Flex>
        </Section>
      </>
    )
  }
)
