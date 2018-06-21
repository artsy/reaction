import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import styled from "styled-components"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Radio } from "Styleguide/Elements/Radio"
import { Section } from "Styleguide/Utils/Section"
import { Toggle } from "../Toggle"

storiesOf("Styleguide/Components", module).add("Toggle", () => {
  return (
    <React.Fragment>
      <Section title="Toggle">
        <Item>
          <Toggle label="Artist Bio">
            <Sans size="3">
              Donald Judd, widely regarded as one of the most significant
              American artists of the post-war period, is perhaps best-known for
              the large-scale outdoor installations and long, spacious interiors
              he designed in Marfa, Texas.
            </Sans>
          </Toggle>
        </Item>
      </Section>
      <Section title="Auto-expand">
        <Item>
          <Toggle label="Description" expanded>
            <Sans size="3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Sans>
          </Toggle>
        </Item>
      </Section>
      <Section title="Disabled">
        <Item>
          <Toggle label="Description" expanded disabled>
            <Serif size="3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Serif>
          </Toggle>
        </Item>
      </Section>
      <Section title="Artwork Filter">
        <Item>
          <Toggle label="Purchase type" expanded disabled>
            <Flex justifyContent="space-between">
              <Checkbox>For sale</Checkbox>
              <Serif size="3" color="black60">
                1000
              </Serif>
            </Flex>
          </Toggle>
          <Toggle label="Medium" expanded>
            <Radio>Painting</Radio>
            <Radio>Sculpture</Radio>
          </Toggle>
          <Toggle label="Gallery" />
          <Toggle label="Institution" />
          <Toggle label="Time period" />
        </Item>
      </Section>
    </React.Fragment>
  )
})

const Item = styled.div`
  width: 50%;
`
