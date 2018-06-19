import React from "react"
import { Section } from "Styleguide/Utils/Section"
import { Select, LargeSelect, SmallSelect } from "../Select"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Elements", module).add("Select", () => {
  const options = [
    {
      value: "meow",
      text: "Cat",
    },
    { value: "bark", text: "Dog" },
    { value: "moo", text: "Cow" },
  ]

  const loggingWithValue = value => {
    // tslint:disable-next-line:no-console
    console.log(value)
  }

  const props = {
    options,
    selected: "bark",
    onSelect: loggingWithValue,
  }

  return (
    <React.Fragment>
      <Section title="Responsive Select">
        <Select {...props} />
      </Section>
      <Section title="Large Select">
        <LargeSelect {...props} />
      </Section>
      <Section title="Small Select">
        <SmallSelect {...props} />
      </Section>
    </React.Fragment>
  )
})
