import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { RadioGroup } from "Styleguide/Elements/RadioGroup"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("RadioGroup", () => {
  return (
    <>
      <Section title="RadioGroup">
        <RadioGroup
          onSelect={id => id}
          options={[
            { label: "Provide shipping address", id: "SHIP" },
            { label: "Arrange for pickup", id: "PICKUP" },
          ]}
        />
      </Section>
      <Section title="RadioGroup with default value">
        <RadioGroup
          onSelect={id => id}
          defaultValue="PICKUP"
          options={[
            { label: "Provide shipping address", id: "SHIP" },
            { label: "Arrange for pickup", id: "PICKUP" },
          ]}
        />
      </Section>
      <Section title="RadioGroup disabled with default value">
        <RadioGroup
          disabled
          onSelect={id => id}
          defaultValue="PICKUP"
          options={[
            { label: "Provide shipping address", id: "SHIP" },
            { label: "Arrange for pickup", id: "PICKUP" },
          ]}
        />
      </Section>
    </>
  )
})
