import { Sans } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Radio } from "Styleguide/Elements/Radio"
import { BorderedRadioGroup, RadioGroup } from "Styleguide/Elements/RadioGroup"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("RadioGroup", () => {
  return (
    <>
      <Section title="RadioGroup">
        <RadioGroup>
          <Radio value="SHIP">Provide shipping address</Radio>
          <Radio value="PICKUP">Arrange for pickup</Radio>
        </RadioGroup>
      </Section>
      <Section title="RadioGroup with default value">
        <RadioGroup defaultValue="SHIP">
          <Radio value="SHIP">Provide shipping address</Radio>
          <Radio value="PICKUP">Arrange for pickup</Radio>
        </RadioGroup>
      </Section>
      <Section title="RadioGroup disabled with default value">
        <RadioGroup defaultValue="SHIP" disabled>
          <Radio value="SHIP">Provide shipping address</Radio>
          <Radio value="PICKUP">Arrange for pickup</Radio>
        </RadioGroup>
      </Section>
      <Section title="Bordered RadioGroup">
        <BorderedRadioGroup defaultValue="SHIP">
          <Radio value="SHIP">Provide shipping address</Radio>

          <Radio value="PICKUP">
            Arrange for pickup
            <Sans size="2" color="black60">
              After you place your order, you’ll be appointed an Artsy
              Specialist within 2 business days to handle pickup logistics.
            </Sans>
          </Radio>
        </BorderedRadioGroup>
      </Section>
    </>
  )
})
